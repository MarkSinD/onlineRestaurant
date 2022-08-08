import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import FilledInput from '@material-ui/core/FilledInput';
import './styleYooKassa.css';
var __html = require('./index');
var template = { __html: __html };

export default class YooKassaTest extends React.Component {


  render() {
    return (
      <div>
        <span dangerouslySetInnerHTML={template} />
      </div>
    );
  }
}