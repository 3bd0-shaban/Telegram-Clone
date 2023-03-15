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
          <Route index path='/' element={<Home />} />

          <Route path=':username/message/:id' element={<Home />} />
          <Route path='channel/:id' element={<Home />} />
          <Route path='/user/:id' element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
