// 토큰 만료 시간 체크 및 관리 유틸리티

export const checkTokenExpiration = (): void => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return;
  }

  try {
    // JWT 토큰 디코딩 (실제 구현에서는 jwt-decode 라이브러리 사용 권장)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (payload.exp && payload.exp < currentTime) {
      // 토큰이 만료된 경우
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('토큰이 만료되어 로그아웃되었습니다.');
    }
  } catch (error) {
    // 토큰 파싱 오류 시 토큰 제거
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.error('토큰 파싱 오류:', error);
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('사용자 정보 파싱 오류:', error);
      return null;
    }
  }
  return null;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('remember_email');
};
