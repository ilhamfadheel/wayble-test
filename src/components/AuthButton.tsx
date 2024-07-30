'use client';
import { signOut, useSession } from 'next-auth/react';
import LoginDialog, { openLoginModal } from '@/components/LoginDialog';
import { useDispatch } from 'react-redux';
import { userLogout } from '@/store/store';

export default function AuthButton() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleLogout = () => {
    dispatch(userLogout());
    signOut();
  };

  if (session) {
    return (
      <>
        <p className={'pr-1'}>Logged in as {session?.user?.name}</p>
        <button className="btn btn-accent" onClick={() => handleLogout()}>
          Log out
        </button>
      </>
    );
  }
  return (
    <>
      {/* @ts-ignore */}
      <LoginDialog />
      <button className="btn btn-primary" onClick={() => openLoginModal()}>
        Login
      </button>
    </>
  );
}
