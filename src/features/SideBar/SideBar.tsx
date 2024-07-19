import React, { useState } from 'react'

import { authActions } from '@/app/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import CustomLink from '@/features/SideBar/CustomLink'
import { useLogOutMutation } from '@/services/auth/signInApi'
import Button from '@/shared/ui/Button/Button'
import { useRouter } from 'next/router'

import { useTranslation } from '../../../hooks/useTranslation'
import {
  Bookmark,
  Home,
  HomeFill,
  LogOut,
  Message,
  MessageFill,
  Plus,
  PlusFill,
  Profile,
  ProfileFill,
  Search,
  SearchFill,
  Trending,
} from '../../../public'

export const SideBar = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [activeLink, setActiveLink] = useState('/')
  const [logOut, { isSuccess }] = useLogOutMutation()
  const accessToken = useAppSelector(state => state.auth.accessToken)
  const { t } = useTranslation()

  const handleClickLogOut = () => {
    logOut(accessToken)
  }

  if (isSuccess) {
    dispatch(authActions.setIsAuth(false))
    router.push('/sign-in')
  }

  return (
    <nav className="absolute bottom-0 sm:relative w-full sm:w-fit min-w-[360px] min-h-[60px] sm:flex sm:flex-col sm:min-w-[200px] sm:py-[73px] border-t sm:border-t-0  bg-dark-500 sm:bg-dark-700 ">
      <div className="flex sm:flex-col justify-evenly h-[60px] sm:h-fit items-center sm:items-baseline w-full sm:pl-14 gap-[24px]">
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.home}
          child1={<Home />}
          child2={<HomeFill />}
          className="order-1"
          href="/profile"
          setActiveLink={setActiveLink}
          title={t.sidebar.home}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.myProfile}
          child1={<Profile />}
          child2={<ProfileFill />}
          className="order-5 sm:order-3"
          href="/profile"
          setActiveLink={setActiveLink}
          title={t.sidebar.myProfile}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.create}
          child1={<Plus />}
          child2={<PlusFill />}
          className="order-2"
          href="/create"
          setActiveLink={setActiveLink}
          title={t.sidebar.create}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.message}
          child1={<Message />}
          child2={<MessageFill />}
          className="order-3 sm:order-4"
          href="/message"
          setActiveLink={setActiveLink}
          title={t.sidebar.message}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.search}
          child1={<Search />}
          child2={<SearchFill />}
          className="order-4 sm:order-5"
          href="/search"
          setActiveLink={setActiveLink}
          title={t.sidebar.search}
        ></CustomLink>
      </div>
      <div className="hidden sm:flex flex-col items-start w-full pl-14 pt-[60px] gap-[24px]">
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.statistics}
          child1={<Trending />}
          href={'/statistics'}
          setActiveLink={setActiveLink}
          title={t.sidebar.statistics}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.favourites}
          child1={<Bookmark />}
          href={'/favorites'}
          setActiveLink={setActiveLink}
          title={t.sidebar.favourites}
        ></CustomLink>
      </div>
      <div className="hidden sm:flex items-center w-full pl-16 pt-[180px] text-light-100">
        <LogOut />
        <Button as="a" className="pl-0" onClick={handleClickLogOut} variant="text">
          <span className="text-light-100 text-medium-14">{t.sidebar.logOut}</span>
        </Button>
      </div>
    </nav>
  )
}
