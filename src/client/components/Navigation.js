import React from 'react';
import { Navbar,FormGroup,FormControl,Button, Radio,ControlLabel,Row,Col} from 'react-bootstrap';

const Navigation = ({searchText,sortOrder,onSearchChangeFunc,onRadioChangeFunc}) => (

  <Navbar>
  	<Navbar.Header>
  	  <Navbar.Brand>
  		<a href="#">GSTV - Full Stack Coding Excercise</a>
  	  </Navbar.Brand>
  	  <Navbar.Toggle />
  	</Navbar.Header>

  </Navbar>

);

export default Navigation;
