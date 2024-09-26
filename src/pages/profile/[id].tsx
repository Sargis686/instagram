import Avatar from 'react-avatar'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { useMeQuery } from '@/services/auth/signInApi'
import { useGetPostsQuery } from '@/services/profile/postsApi'
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetProfileInfoQuery,
} from '@/services/profile/profileApi'
import { GetProfilePostsParams } from '@/shared/types/ApiTypes/ProfileApiTypes'
import Button from '@/shared/ui/Button/Button'
import Link from 'next/link'

const Profile = () => {
  const { data: me } = useMeQuery()
  const { data: profileInfo } = useGetProfileInfoQuery()

  const params: GetProfilePostsParams = {
    userName: me?.userName!,
  }

  const { data: posts } = useGetPostsQuery(params)
  const { data: followers } = useGetFollowersQuery(profileInfo?.userName!)
  const { data: following } = useGetFollowingQuery(profileInfo?.userName!)

  const profileName = `${profileInfo?.firstName} ${profileInfo?.lastName}`
  const isProfileOwner = me?.userId === profileInfo?.id

  return (
    <div className="flex flex-1 pr-16 pl-6 pt-[35px] w-full">
      <div className="min-w-40">
        <Avatar name={profileName} round size="160px" src={profileInfo?.avatars?.[0]?.url || ''} />
      </div>
      <div className="w-full pl-9 flex flex-col">
        <div className="flex justify-between w-full">
          <span className="text-h1">{profileName}</span>
          {isProfileOwner && (
            <Link href="/profile/settings">
              <Button variant="secondary">Profile Settings</Button>
            </Link>
          )}
        </div>
        <div className="flex gap-[100px] pb-6 pt-5">
          <div className="flex flex-col">
            <span>{following?.totalCount}</span>
            <span>Following</span>
          </div>
          <div className="flex flex-col">
            <span>{followers?.totalCount}</span>
            <span>Followers</span>
          </div>
          <div className="flex flex-col">
            <span>{posts?.totalCount}</span>
            <span>Publications</span>
          </div>
        </div>
        <span>{profileInfo?.aboutMe}</span>
      </div>
    </div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile