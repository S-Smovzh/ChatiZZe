export interface RootState {
  activation: {
    notActivated: boolean;
  };
  auth: {
    logged: boolean;
    user: {
      _id: string;
      username: string;
      email: string;
      phoneNumber: string;
      photo: string;
      firstName: string;
      lastName: string;
      birthday: string;
    };
    showForgotPassword: boolean;
  };
  chat: {
    data: {
      chatName: string;
      roomId: string;
      isPrivate: boolean;
      isUser: boolean;
      photo: string;
      description: string;
      usersID: string[];
      activeUsers: number;
      recentMessage: {
        text: string;
        attachment: string[];
        timestamp: string;
        user: {
          _id: string;
          username: string;
        };
      };
    };
    showCreateChat: boolean;
    showManageChatMenu: boolean;
    showAddUser: boolean;
    showChatData: boolean;
    showUserInfo: boolean;
    showUserMenu: boolean;
    userMenuButtonRef: any;
    enlargeChatList: boolean;
    showUserSettings: boolean;
    deletedMessageId: string;
    updatedMessageId: string;
    updatedMessagePrevState: any;
    updatedMessageNewState: any;
    rights: string[];
    reload: boolean;
  };
  error: {
    show: boolean;
    errorText: string;
  };
  menu: {
    showOffsideMenu?: boolean;
    menuButtonRef?: any | null;
  };
  notification: {
    showCookie: boolean;
    showVerification: boolean;
  };
  theme: {
    showCustomThemeModal: boolean;
    type: "light" | "dark" | "custom";
    primary: string;
    secondary: string;
    layout: string;
    borderPrimary: string;
    borderSecondary: string;
    colorPrimary: string;
    colorSecondary: string;
    backgroundImage?: string;
  };
}
