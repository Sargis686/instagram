import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Button from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Input } from '@/shared/ui/Input/Input'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div>
      <Card className="w-[378px] h-[648px] mx-auto my-auto p-[24px]">
        <h1 className="text-light-100 text-h1 text-center mb-[13px]">Sign Up</h1>

        <div className="flex justify-evenly mb-[24px]">
          <Link href={'https://www.google.com/?client=safari'} target="_blank">
            <Image alt="google-icon" height={36} src="/google.svg" width={36}></Image>
          </Link>
          <Link href={'https://github.com'} target="_blank">
            <Image alt="github-icon" height={36} src="/git.svg" width={36}></Image>
          </Link>
        </div>

        <div className="flex flex-col gap-[20px] mb-[20px]">
          <Input fullWidth label="Username" placeholder="Epam11" />
          <Input fullWidth label="Email" placeholder="Epam@epam.com" />
          <Input fullWidth label="Password" placeholder="******************" />
          <Input fullWidth label="Password confirmation" placeholder="******************" />
        </div>
        <div className="flex items-center">
          <Checkbox checked className="mb-[22px] text-small ml-[15px]" />
          <div className="ml-5 gap-0.5 text-[12px] mb-[22px]">
            <span>I Agree </span>
            <Link className={'text-blue-500 underline'} href={'/termsOfService'}>
              Terms Of Service
            </Link>
            <span> and </span>
            <Link className={'text-blue-500 underline'} href={'/privacy'}>
              Privacy Policy
            </Link>
          </div>
        </div>

        {/*<p className="text-small text-light-100">Test</p>*/}

        <Button className="btn-primary mb-[20px]" fullWidth>
          Sign Up
        </Button>

        <p className="text-light-100 text-center mb-[6px]">Do you have an account?</p>

        <Button fullWidth variant="text">
          Sign In
        </Button>
      </Card>
    </div>
  )
}

SignUp.getLayout = getLayout
// export default SignUp
