import React, { Component } from 'react';
import { Route, Switch } from 'react-router-native';
import Entrypoint from './Entrypoint';
import Profile from './Profile';
import Vitals from './Vitals';
import Pregnancy from './Pregnancy';
import Screening from './Screening';
import MedicalHistory from './MedicalHistory';
import Miscellaneous from './Miscellaneous';
import Menu from './Entrypoint/Menu'
import Admission from './Admission'

const Triage = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Entrypoint} />
    <Route path={`${match.url}/profile`} component={Profile} />
    <Route path={`${match.url}/patients/admission`} component={Admission} />
    <Route exact path={`${match.url}/patients/:queueId`} component={Menu} />
    <Route path={`${match.url}/patients/:patientId/vitals`} component={Vitals} />
    <Route path={`${match.url}/patients/:patientId/pregnancy`} component={Pregnancy} />
    <Route path={`${match.url}/patients/:patientId/screening`} component={Screening} />
    <Route path={`${match.url}/patients/:patientId/history`} component={MedicalHistory} />
    <Route path={`${match.url}/patients/:patientId/miscellaneous`} component={Miscellaneous} />
  </Switch>
)

export default Triage