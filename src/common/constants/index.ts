import { routerPath } from 'common/config/router/router.path';
import { IOrderStatus } from 'common/types/order.model';

export const CATEGORY_TABLE_HEAD = ['id', 'name', 'action'];

export const PRODUCT_TABLE_HEAD = [
  'id',
  'categoryName',
  'thumbnail',
  'name',
  'description',
  'price',
  'isStocked',
  'action',
];

export const PRODUCT_IN_CART_TABLE_HEAD = [
  'thumbnail',
  'name',
  'price',
  'quantity',
  'total',
  'action',
];

export const ORDER_DETAIL_TABLE_HEAD = [
  'ordinalNumber',
  'thumbnail',
  'name',
  'price',
  'quantity',
  'total',
  'action',
];

export const ADMIN_ORDER_DETAIL_TABLE_HEAD = [
  'ordinalNumber',
  'thumbnail',
  'name',
  'price',
  'quantity',
  'total',
];

export const ORDER_TABLE_HEAD = [
  'id',
  'user',
  'firstName',
  'lastName',
  'phone',
  'address',
  'totalPrice',
  'status',
  'action',
];

export const PRODUCT_SELECT_IS_STOCK = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];

export const ORDER_SELECT_STATUS = [
  {
    value: IOrderStatus.CONFIRM,
    label: IOrderStatus.CONFIRM.toUpperCase(),
  },
  {
    value: IOrderStatus.COMPLETE,
    label: IOrderStatus.COMPLETE.toUpperCase(),
  },
  {
    value: IOrderStatus.CANCEL,
    label: IOrderStatus.CANCEL.toUpperCase(),
  },
];

export const IMAGE_BANNER_SLIDER = [
  {
    url: 'https://res.cloudinary.com/duitozhul/image/upload/v1655983706/the-pizza-heaven/slider/banner-4.jpg',
  },
  {
    url: 'https://res.cloudinary.com/duitozhul/image/upload/v1655983706/the-pizza-heaven/slider/banner-5.jpg',
  },
  {
    url: 'https://res.cloudinary.com/duitozhul/image/upload/v1655983706/the-pizza-heaven/slider/banner-6.jpg',
  },

  {
    url: 'https://res.cloudinary.com/duitozhul/image/upload/v1655983706/the-pizza-heaven/slider/banner-8.jpg',
  },
  {
    url: 'https://res.cloudinary.com/duitozhul/image/upload/v1655983706/the-pizza-heaven/slider/banner-9.jpg',
  },
  {
    url: 'https://res.cloudinary.com/duitozhul/image/upload/v1655983706/the-pizza-heaven/slider/banner-1.jpg',
  },
  {
    url: 'https://res.cloudinary.com/duitozhul/image/upload/v1655983706/the-pizza-heaven/slider/banner-2.jpg',
  },
  {
    url: 'https://res.cloudinary.com/duitozhul/image/upload/v1655983706/the-pizza-heaven/slider/banner-3.jpg',
  },
  {
    url: 'https://res.cloudinary.com/duitozhul/image/upload/v1655983706/the-pizza-heaven/slider/banner-7.jpg',
  },
];

export const FOOTER_TOP_ARR = [
  {
    image:
      'https://res.cloudinary.com/duitozhul/image/upload/v1655996501/the-pizza-heaven/footer/footer_01_s773a5.png',
    title: 'Chất lượng dẫn đầu',
    description:
      'Chú trọng khâu tuyển chọn đội ngũ đầu bếp chuyên nghiệp, thực đơn của Pizza Express luôn được đổi mới, đa dạng với pizza nhiều hương vị, sandwich, mỳ ý và các món ăn nhanh khác.',
  },
  {
    image:
      'https://res.cloudinary.com/duitozhul/image/upload/v1655996540/the-pizza-heaven/footer/footer_02_cqwd8g.png',
    title: 'Giao hàng đúng giờ',
    description:
      'Để tăng cường sự tin tưởng và yên tâm với khách hàng, Pizza Express cam kết luôn giao hàng đúng giờ và chi phí giao hàng rẻ nhất để đảm bảo khách hàng có thể nhận bánh trong thời gian nhanh nhất.',
  },
  {
    image:
      'https://res.cloudinary.com/duitozhul/image/upload/v1655996554/the-pizza-heaven/footer/footer_03_y5loju.png',
    title: 'Pizza take away',
    description:
      'Lựa chọn cho mình một hướng đi mới để tạo nên sự khác biệt, mô hình Pizza take away - pizza mang đi giúp khách hàng tiết kiệm thời gian, đem đến sự tiện lợi tối ưu trong việc lựa chọn, thanh toán, đóng gói và nhận hàng.',
  },
  {
    image:
      'https://res.cloudinary.com/duitozhul/image/upload/v1655996586/the-pizza-heaven/footer/footer_04_mbkm54.png',
    title: 'Phục vụ chuyên nghiệp',
    description:
      'Pizza Express cùng với đội ngũ nhân viên mang đầy sức trẻ và nhiệt huyết, chúng tôi luôn mong muốn đem lại cho khách hàng của mình chất lượng dịch vụ tốt nhất, luôn lắng nghe và chăm sóc những nhu cầu dù là nhỏ nhất của Quý khách.',
  },
];

export const NAVBAR_ATTRIBUTE = {
  APP: [
    {
      name: 'Home',
      path: routerPath.common.HOME,
    },
    {
      name: 'Menu',
      path: '/#menu',
    },
    {
      name: 'Contact',
      path: '/#contact',
    },
    {
      name: 'Order',
      path: routerPath.app.ORDER_SEARCH,
    },
  ],
  ADMIN: [
    {
      name: 'Dashboard',
      path: routerPath.admin.DASHBOARD,
    },
    {
      name: 'Category',
      path: routerPath.admin.CATEGORY_LIST,
    },
    {
      name: 'Product',
      path: routerPath.admin.PRODUCT_LIST,
    },
    {
      name: 'Order',
      path: routerPath.admin.ORDER_LIST,
    },
  ],
};

export const ACCOUNT_ATTRIBUTE = {
  NOT_LOGIN: [
    {
      attribute: 'Sign up',
      path: routerPath.auth.USER_REGISTER,
    },
    {
      attribute: 'Log in',
      path: routerPath.auth.LOGIN,
    },
  ],
  CLIENT_ACCOUNT: [
    {
      attribute: 'My Account',
      path: routerPath.app.MY_ACCOUNT,
    },
    {
      attribute: 'Log out',
      path: routerPath.common.HOME,
    },
  ],
  ADMIN_ACCOUNT: [
    {
      attribute: 'Management',
      path: routerPath.admin.DASHBOARD,
    },
    {
      attribute: 'Log out',
      path: routerPath.common.HOME,
    },
  ],
};

export interface ISelect {
  value: string;
  label: string;
}

export const PRODUCT_FILTER_ATTRIBUTE: ISelect[] = [
  {
    value: 'id',
    label: 'Best seller',
  },
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'price',
    label: 'Price',
  },
];

export const ORDER_FILTER_ATTRIBUTE: ISelect[] = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'confirmed',
    label: 'Confirmed',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'canceled',
    label: 'Canceled',
  },
];

export const PRODUCT_ORDER_BY_ATTRIBUTE: ISelect[] = [
  {
    value: 'asc',
    label: 'Ascending',
  },
  {
    value: 'desc',
    label: 'Descending',
  },
];

export const ORDER_ORDER_BY_ATTRIBUTE: ISelect[] = [
  {
    value: 'desc',
    label: 'Latest',
  },
  {
    value: 'asc',
    label: 'Oldest',
  },
];

export const CHECKOUT_STEP = [
  'Order form',
  'Order information',
  'Payment information',
];
