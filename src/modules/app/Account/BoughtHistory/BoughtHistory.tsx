import { getLocalStorageItem } from 'common/helper/storage';
import { IOrder } from 'common/types/order.model';
import { IUser } from 'common/types/user.model';
import React, { useEffect, useState } from 'react';
import appService from 'services/appService';

export const BoughtHistory = () => {
  const userInfo: IUser = getLocalStorageItem('user-info');

  const [orderByUserId, setOrderByUserId] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrderByUserIdAPI = async () => {
      try {
        const response = await appService.getOrderByUserId(
          userInfo?.id as number,
        );
        setOrderByUserId(response);
      } catch (error) {
        console.log('Error when getOrderByUserId', error);
      }
    };
    fetchOrderByUserIdAPI();
  }, [userInfo.id]);

  return (
    <>
      <p className="text-guild-line">Bought History</p>
    </>
  );
};
