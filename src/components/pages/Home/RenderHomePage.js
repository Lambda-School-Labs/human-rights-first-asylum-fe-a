import React, { useMemo, useState, useEffect } from 'react';
import CaseTable from '../CaseTable/CaseTable';
import DashboardNav from '../DashboardNav/DashboardNav';

import axios from 'axios';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const [caseData, setCaseData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/case')
      .then(res => {
        setCaseData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const logout = () => authService.logout;

  return (
    <div>
      {/* <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1> */}
      <div className="dashboard-container">
        <DashboardNav logout={logout} userInfo={userInfo} />

        <CaseTable caseData={caseData} />
      </div>
    </div>
  );
}
export default RenderHomePage;
