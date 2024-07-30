'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setJustLoggedIn } from '@/store/store';

export const openLoginModal = () => {
  const modal = document.getElementById('login_modal');
  if (modal instanceof HTMLDialogElement) {
    modal.showModal();
  }
};

export default function LoginDialog() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Missing Credentials');
      return;
    } else {
      setError('');
    }

    signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
    })
      .then((response) => {
        if (response?.ok) {
          dispatch(setJustLoggedIn(true));
          const modal = document.getElementById('login_modal');
          if (modal instanceof HTMLDialogElement) {
            modal.close();
          }
        } else {
          setError('Error Logging In');
        }
      })
      .catch(() => {
        setError('Error Logging In');
      });
  };

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h1 className="text-center">Login</h1>
        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email or Username" value={username} onChange={handleUsernameChange} />
            </label>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="password" className="grow" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </label>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="text-center mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
