import { useSelector } from 'react-redux';
import Title from '../components/ui/Title';
import SettingForm from '../components/ui/SettingForm';
import ChangePassword from '../components/ui/ChangePassword';
const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-4xl p-4 my-6 shadow-lg bg-gray-50 dark:bg-black/20 md:px-10 md:my-10">
        <div className="mt-6 border-b-2 border-gray-200 dark:border-gray-800">
          <Title title="General Settings" />
        </div>
        <div className="py-10">
          <p className="text-lg font-bold text-black dark:text-dark">
            Profile Information
          </p>
          <div className="flex items-center gap-4 my-8">
            <div className="flex font-bold text-2xl items-center justify-center w-12 h-12 text-white rounded full cursor-pointer bg-violet-600">
              <p>{user?.firstname?.charAt(0)}</p>
            </div>
            <p className="text2xl font-semibold text-black dark:text-white">
              {user?.firstname}
            </p>
          </div>
          <SettingForm />
          {!user?.provided && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
