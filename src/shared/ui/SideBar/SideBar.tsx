import React, { useState } from 'react'

import { authActions } from '@/app/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { useLogOutMutation } from '@/services/auth/signInApi'
import Button from '@/shared/ui/Button/Button'
import CustomLink from '@/shared/ui/SideBar/CustomLink'
import Image from 'next/image'
import { useRouter } from 'next/router'

import {
  Bookmark,
  Home,
  HomeFill,
  Message,
  MessageFill,
  Plus,
  PlusFill,
  Profile,
  ProfileFill,
  Search,
  SearchFill,
  Trending,
} from '../../../../public'

export const SideBar = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [activeLink, setActiveLink] = useState('/')
  const [logOut, { isSuccess }] = useLogOutMutation()
  const accessToken = useAppSelector(state => state.auth.accessToken)

  const handleClickLogOut = () => {
    logOut(accessToken)
  }

  if (isSuccess) {
    router.push('/sign-in')
    dispatch(authActions.setIsAuth(false))
  }

  return (
    <nav className="absolute bottom-0 md:relative w-full md:w-fit min-w-[360px] min-h-[60px] md:flex md:flex-col md:h-headerHeight md:min-w-[220px] md:py-[73px] border-t md:border-t-0 md:border-r bg-dark-500 md:bg-dark-700 border-dark-300">
      <div className="flex md:flex-col justify-evenly h-[60px] md:h-fit items-center md:items-baseline w-full md:pl-14 gap-[24px]">
        <CustomLink
          activeLink={activeLink}
          alt="home"
          child1={<Home />}
          child2={<HomeFill />}
          className="order-1"
          href="/profile"
          setActiveLink={setActiveLink}
          title={'Home'}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt="profile"
          child1={<Profile />}
          child2={<ProfileFill />}
          className="order-5 md:order-3"
          href="/profile"
          setActiveLink={setActiveLink}
          title={'My Profile'}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt="create"
          child1={<Plus />}
          child2={<PlusFill />}
          className="order-2"
          href="/create"
          setActiveLink={setActiveLink}
          title={'Create'}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt="message"
          child1={<Message />}
          child2={<MessageFill />}
          className="order-3 md:order-4"
          href="/message"
          setActiveLink={setActiveLink}
          title={'Message'}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt="search"
          child1={<Search />}
          child2={<SearchFill />}
          className="order-4 md:order-5"
          href="/search"
          setActiveLink={setActiveLink}
          title={'Search'}
        ></CustomLink>
      </div>
      <div className="hidden md:flex flex-col items-start w-full pl-14 pt-[60px] gap-[24px]">
        <CustomLink
          activeLink={activeLink}
          alt="statistics"
          child1={<Trending />}
          href={'/statistics'}
          setActiveLink={setActiveLink}
          title={'Statistics'}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt="favorites"
          child1={<Bookmark />}
          href={'/favorites'}
          setActiveLink={setActiveLink}
          title={'Favorites'}
        ></CustomLink>
      </div>
      <div className="hidden md:flex items-start w-full pl-16 pt-[180px] text-light-100">
        <Image alt="logOut" className="cursor-pointer" height={36} src="/log-out.svg" width={36} />
        <Button as="a" className="pl-0" onClick={handleClickLogOut} variant="text">
          <span className="text-light-100">Log Out</span>
        </Button>
      </div>
    </nav>
  )
}
