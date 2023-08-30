import { Route, Routes } from 'react-router-dom'
import { PrivateRouteCompany } from '../components/PrivateRouteCompany'
import { PrivateRouteUser } from '../components/PrivateRouteUser'
import { SignIn } from '../views/signin'
import { RegisterUser } from '../views/authentication/user'
import { RegisterCompany } from '../views/authentication/company'
import { Home } from '../views/userView/user'
import { Dashboard } from '../views/companyView/company/dashboard'
export function Router() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRouteUser>
            <Home />
          </PrivateRouteUser>
        }
      />
      <Route
        path="/company/dashboard"
        element={
          <PrivateRouteCompany>
            <Dashboard />
          </PrivateRouteCompany>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register/user" element={<RegisterUser />} />
      <Route path="/register/company" element={<RegisterCompany />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}
