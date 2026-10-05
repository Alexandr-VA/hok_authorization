// src/App.tsx
import React from 'react';
import { withAuthorization } from './hoc/withAuthorization';
import { AdminPanel } from './components/AdminPanel';
import type { CurrentUser } from './types';

// Создаём защищённую версию AdminPanel
const AdminPanelWithAuth = withAuthorization(AdminPanel, ['admin']);

const adminUser: CurrentUser = { roles: ['admin', 'user'], name: 'Иван' };
const regularUser: CurrentUser = { roles: ['user'], name: 'Пётр' };

const App: React.FC = () => {
  return (
    <div>
      <h1>Демонстрация HOC withAuthorization</h1>

      <section>
        <h3>Пользователь с ролью admin:</h3>
        <AdminPanelWithAuth currentUser={adminUser} />
      </section>

      <section>
        <h3>Пользователь с ролью user:</h3>
        <AdminPanelWithAuth currentUser={regularUser} />
      </section>

      <section>
        <h3>Неавторизованный пользователь:</h3>
        <AdminPanelWithAuth currentUser={null} />
      </section>
    </div>
  );
};

export default App;