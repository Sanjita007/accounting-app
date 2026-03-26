import { Button, Label, TextInput } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { userLogin } from 'src/api';
import { useAlertBox } from 'src/components/shared/AlertBox';
import { UserLogin } from 'src/Models/Model';

const { useApiWithToast } = useAlertBox();

const AuthLogin = () => {
  localStorage.setItem('accessToken', '');
  const navigate = useNavigate();
  const [user, setUser] = useState<UserLogin>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // this is the only thing that stopped the browser from throwing ns_binding_aborted error
    if (user) {
      // //alert("updating");
      // apiWithToast(userLogin(user), {
      //   loading: `Logging in as ${user.userName}..`,
      //   success: `$Logged in as ${user.userName} successfully!`,
      //   error: `Failed to log in as ${user.userName}.`,
      //debugger;
      const res = await useApiWithToast(userLogin(user),  {
            loading: 'logging in..',
            success: 'Login successful !',
            error: 'Failed to log in !',
          });
      if (res == true) {
        navigate('/');
      }
    }
  };

  function handleUserNameChange(e: ChangeEvent<HTMLInputElement>): void {
    setUser(
      (prev) =>
        ({
          ...(prev ?? {}),
          userName: e.target.value,
        }) as UserLogin,
    );
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setUser(
      (prev) =>
        ({
          ...(prev ?? {}),
          password: e.target.value,
        }) as UserLogin,
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label>Username</Label>
          </div>
          <TextInput
            id="User Name"
            type="text"
            sizing="md"
            required
            className="form-control "
            value={user?.userName}
            placeholder="userName"
            onChange={handleUserNameChange}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label>Password</Label>
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            required
            className="form-control "
            value={user?.password}
            placeholder="password"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex justify-between my-5">
          {/* <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label
              htmlFor="accept"
              className="opacity-90 font-normal cursor-pointer"
            >
              Remeber this Device
            </Label>
          </div> */}
          <Link to={'/'} className="text-primary text-sm font-medium">
            Forgot Password ?
          </Link>
        </div>
        <Button type="submit" color={'primary'} className="w-full bg-primary text-white">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
