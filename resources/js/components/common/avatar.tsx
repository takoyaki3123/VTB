import { reducerType } from "@/store";
import { User } from "@/types";
import { useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";

const Avatar = (props: {size: string}) => {
    const user = useSelector<reducerType, User>(state => state.user);
    return (
        <div className={ "avatar-container " + (props.size == 'large' ? 'avatar-large' : 'avatar-small')}>
            {user.avatar ? 
                <img className="avatar" src={"/storage/image/" + user.avatar}/>
            :
                <Fragment>
                    <span className="avatar">

                    </span>
                    <span className="avatar-default">
                        { user.name }
                    </span>
                </Fragment>
            }
        </div>
    )
}
export default Avatar;