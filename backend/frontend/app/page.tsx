import { IsLoggedIn } from "./components/auth";
import GuestDashboard from "./components/guestDashboard";
import UserDashboard from "./components/userDashboard";





export default async function HomePage() {


    if (await IsLoggedIn()) {
        return(
            <UserDashboard />
        )
    }
    else {
        return(
            <GuestDashboard />
        )
    }
}
