import { Route, Routes, useLocation } from 'react-router-dom'
import { ROLES } from './Config/Roles';
import { AnimatePresence } from 'framer-motion';
import { SignIn, RequireAuth, Layout, PersistLogin, NotFounded, Home, ConfirmNumber } from './Components/Exports'
function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<PersistLogin />}>
          <Route path='/' element={<Layout />}>
            <Route index path='/' element={<Home />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='confirm' element={<ConfirmNumber />} />
            <Route path='notfound' element={<NotFounded />} />
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Customer]} />}>
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>

              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
