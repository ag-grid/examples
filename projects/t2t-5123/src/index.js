import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import 'bootstrap/dist/css/bootstrap.min.css"';
// ag-grid licensing:
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css"
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css"
import {LicenseManager} from "@ag-grid-enterprise/core"

LicenseManager.setLicenseKey('CompanyName=Insight Enterprises_on_behalf_of_UnitedHealth Group,LicensedGroup=DMS,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=10,LicensedProductionInstancesCount=0,AssetReference=AG-009907,ExpiryDate=19_August_2021_[v2]_MTYyOTMyNzYwMDAwMA==54ed1d6c5ef2bdd16715192b5e212eab')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
