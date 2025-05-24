// mock data
const users = [
  { id: 1, username: 'admin', password: 'admin123', name: 'John Doe', phone: '+998907773277', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', name: 'Jane Smith', phone: '+998901234567', role: 'user' }
];

export async function loginUser(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    throw new Error('Неверный пароль или email');
  }
  
  // imitate token generation
  const token = btoa(JSON.stringify({ id: user.id, username: user.username, role: user.role }));
  localStorage.setItem('auth_token', token);
  
  const { password: _, ...userData } = user;
  return userData;
}


export async function logoutUser() {
  localStorage.removeItem('auth_token');
}


export function checkAuth() {
  const token = localStorage.getItem('auth_token');
  if (!token) return null;
  
  try {
    const userData = JSON.parse(atob(token));
    const user = users.find(u => u.id === userData.id);
    if (!user) return null;
    
    const { password: _, ...userInfo } = user;
    return userInfo;
  } catch (error) {
    localStorage.removeItem('auth_token');
    return null;
  }
}
