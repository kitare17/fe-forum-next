"use client"
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {UserInterface} from "@/app/interface/userinterface";

const View=()=>{
    const {listUser} = useSelector((state:RootState) => state.user);

    return (
        <ul>
            {listUser.map((user: UserInterface) => {
                return (
                    <li key={user.id}>
                        {user.id} {user.title}
                    </li>
                )
            })
            }
        </ul>
    )
}
export default View;