import { Route, Routes } from 'react-router-dom'
import { ROLES } from './Config/Roles';
import { SignIn, RequireAuth, Layout, NotFounded, Home, ConfirmNumber, SetName } from './Components/Exports'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='signin' element={<SignIn />} />
        <Route path='confirm' element={<ConfirmNumber />} />
        <Route path='full-name' element={<SetName />} />
        <Route path='notfound' element={<NotFounded />} />
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          {[':username/message/:id', 'channel/:id'].map((path, index) => (
            <Route key={index} index path={path} element={<Home />} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
