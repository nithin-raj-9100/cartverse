export interface SignupBody {
  email: string;
  password: string;
  name: string;
}

export interface SignupResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}
