import { Route, Routes, useLocation } from 'react-router-dom'
import { ROLES } from './Config/Roles';
import { AnimatePresence } from 'framer-motion';
import { SignIn, RequireAuth, Layout, PersistLogin, NotFounded, Home, ConfirmNumber } from './Components/Exports'
function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Layout />}>
          <Route path='signin' element={<SignIn />} />
          <Route path='confirm' element={<ConfirmNumber />} />
          <Route element={<PersistLogin />}>
            <Route path='notfound' element={<NotFounded />} />
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route index path='/' element={<Home />} />
              <Route path='/user/:id' element={<Home />} />

            </Route>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
