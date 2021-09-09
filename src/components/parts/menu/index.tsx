import React from "react";
import {Link} from "react-router-dom";

const Menu = (): JSX.Element => {
  return (
    <div className="row mb-5">
      <div className="card col-12">
        <div className="card-body">
          <ul>
            <li><Link to="/timeline">トップへ</Link></li>
            <li><Link to="/profile">プロフィール設定へ</Link></li>
            <li><Link to="/mypage/send">マイページへ</Link></li>
            <li><Link to="/prize">景品交換</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Menu;