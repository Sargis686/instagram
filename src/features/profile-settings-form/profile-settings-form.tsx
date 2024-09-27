import { useEffect, useState } from 'react'

import { useProfileSettingsForm } from '@/features/profile-settings-form/useProfileSettingsForm'
import { usePutSettingsMutation } from '@/services/profile/profileApi'
import {
  ControlledDatepicker,
  ControlledInput,
  ControlledSelect,
  ControlledTextarea,
} from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { City, Country } from 'country-state-city'

export type DataForm = {
  aboutMe?: string
  city?: Object
  country?: Object
  dateOfBirth?: Date
  firstName: string
  lastName: string
  region?: string
  userName: string
}

export const ProfileSettingsForm = ({ myProfileInfo }: any) => {
  const { control, getFieldState, handleSubmit, setValue, watch } =
    useProfileSettingsForm(myProfileInfo)

  const [setSettingsData] = usePutSettingsMutation()

  const countries = Country.getAllCountries()

  const [cities, setCities] = useState<{ label: string; value: string }[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const watchCountry = watch('country')
  const watchCity = watch('city')

  useEffect(() => {
    const selectCountry = countries.find(el => el.name === watchCountry?.label)

    if (selectCountry) {
      const citiesList = City.getCitiesOfCountry(selectCountry.isoCode)
      const transformedCities = transformData(citiesList, 'name', 'name')

      setCities(transformedCities)

      if (getFieldState('country').isDirty) {
        setValue('city', transformedCities[0])
      }
      if (transformedCities.length === 0) {
        setValue('city', { label: 'not found', value: '' })
      }
    }
  }, [watchCountry])

  const transformData = (data: any, labelKey: string, valueKey: string) => {
    return data.map((item: any) => ({
      label: item[labelKey],
      value: item[valueKey],
    }))
  }

  const allCountries = transformData(countries, 'name', 'isoCode')

  const onSubmit = async (data: DataForm) => {
    const transformedData = {
      ...data,
      city: watchCity?.label,
      country: watchCountry?.label,
    }

    setSettingsData(transformedData)

    try {
      await setSettingsData(transformedData).unwrap()
      setModalMessage('Данные успешно изменены.')
      setModalVisible(true)
    } catch (error) {
      setModalMessage('Не удалось сохранить данные.')
      setModalVisible(true)
    }
  }

  return (
    <>
      <form className="w-full flex flex-col gap-6 pt-[24px]" onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput control={control} fullWidth label="userName" name="userName" />
        <ControlledInput control={control} fullWidth label="First Name" name="firstName" />
        <ControlledInput control={control} fullWidth label="Last Name" name="lastName" />
        <ControlledDatepicker
          control={control}
          fullWidth
          label="Date of birth"
          name="dateOfBirth"
          startDate={new Date('2000/12/31')}
        />
        <div className="flex gap-[24px]">
          <ControlledSelect
            control={control}
            label="Select your country"
            name="country"
            options={allCountries}
          />
          <ControlledSelect
            control={control}
            label="Select your city"
            name="city"
            options={cities}
          />
        </div>
        <ControlledTextarea
          control={control}
          fullWidth
          label="About Me"
          name="aboutMe"
          placeholder="text-area"
        />
        <Button>Save Changes</Button>
      </form>
      {modalVisible && (
        <Modal
          onClose={() => {
            setModalVisible(false)
          }}
          title="Success"
        >
          <div className="flex flex-col justify-center items-center min-w-[300px] min-h-[150px]">
            <div className="flex-grow flex items-center justify-center">
              <span>{modalMessage}</span>
            </div>
            <div className="w-full">
              <Button fullWidth onClick={() => setModalVisible(false)}>
                Ok
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
