import client from '@/lib/axiosInstance';
import { PageModel, PageRequest } from '@/reactQuery/util/useModelList';
import { objectToQueryString } from '@/lib/urlUtils';
import { Notification } from '@/data/model/Notification';

export const getNotifications = async (pageRequest: PageRequest) => {
  const query = objectToQueryString({ ...pageRequest });
  const result = await client.get(`user/notification?${query}`, {});

  console.log(result);
  return result as PageModel<Notification>;
};

export const makeReadNotification = async (notificationId: string) => {
  const result = await client.patch(`user/notification/${notificationId}`);
  return true;
};
