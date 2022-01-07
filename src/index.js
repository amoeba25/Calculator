/* eslint-disable */ //disables the warnings

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col} from 'react-bootstrap';

class Key extends React.Component {
    // This is indivdual key component of the Calculator
    render() {
        return (
            <Button 
                onClick = {this.props.onChange}
                id={this.props.id} >
                {this.props.value}
            </Button>
        )
    }
}

class Display extends React.Component {
    //This showcases the dispaly component of the calculator
    render(){
        return(
            <div id={this.props.id}> 
                <h1>{this.props.displaytext}</h1>
            </div>
        )
    }
}


class Calculator extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            expression:'',
            display: '0', //inital display is zero
            
        }
    }


    //when any key other than equal is hit 
    numKey(i, id)  {
        return (
            <Key value = {i} 
            onChange = {() =>this.displayChange(i)} 
            id={id}/>
        )
    }

    //when percentage key is hit
    perKey(i, id){
        return (
            <Key value = {i} 
            onChange = {() =>this.percentDisplay()}
            id= {id} />
        )
    }

    //when equal key is hit
    equalKey(i, id){
        return (
            <Key value = {i} 
            onChange = {() =>this.evaluateDisplay()}
            id={id} />
        )
    }
    

    //display changes when the button is clicked 
    displayChange(i) {
        let current= this.state.display;
        if(current==='0'){current=''}

        //checking if 2 expression aren't consecutive
        let consecutive= /[\x,\+,\/]$/;
        if(current.match(consecutive)){
            if(i=== '+'|| i==='x' || i=='/'){
                current= current.replace(consecutive, '');
            }
        }

        //three signs after negative
        let three_sign = /\x\-$|\+\-$|\/\-$/;
        if(current.match(three_sign)) {
            if(i=== '+'|| i==='x' || i=='/'){
                current = current.replace(three_sign, '')
            }
            if(i === '-') {
               i='';
            }
        }

        //cant go more than 2 negative signs
        if(current.match(/\-\-/g)){
            if(i ==='-'){
                current= current.replace(/\-\-/, '-')
            }
        }

        //decimal condition
        let decimal_regex= /\d+\.\d*$/;
        if(current.match(decimal_regex)){
            if(i==='.'){
                i=''
            }
        }

        let newText = current + i;
        let backText = current.substring(0, current.length - 1);
        //condition if C key is hit
        if(i ==='C') {
            this.setState({
                display: backText,
            })
        }
        //condition if AC key hit
        else if(i==='AC'){
            this.setState({
                expression:'',
                display: '0'
            })
        }
        else if(current!=='0' && (i=== '-' || i==='+' || i === 'x' || i==='/')){
            this.setState({
                expression: current,
                display: newText
            })
        }
        //any other key is hit
        else{
            this.setState({
                display : newText,
            })
        }
       
        
    }
    
    //when the percentage key is hit the last number is divided by 100
    percentDisplay(){
       
        let expression = this.state.display;
        let match_num= expression.match(/[0-9]*$/)[0];
        let match_str= String(Number(match_num/100)); //converting match_num decimal
        
        let percentAns = expression.replace(/[0-9]*$/,match_str); 

        this.setState({
            display: percentAns,
        })


    }
    
    //when equal key is hit, expression is evaluated
    evaluateDisplay(){
        let expression = this.state.display; 

        //replacing all the multiplication signs with '*'
        for(let i of expression){
            if (i ==='x'){
                expression= expression.replace(i, '*')
            }
            if (i ==='^'){
                expression= expression.replace(i, '**')
            }
            
        }

        //condition for two negative signs
        expression = expression.replace(/\-\-/g, '+'); 

        this.setState({
            expression : expression,
            display: String(eval(expression)),
        })
    }


    //main render method
    render() {
        return (
            <>
                <div className= 'switch'>
                    
                </div>
                <div className='display'>
                    <Display displaytext= {this.state.expression} id='outer-display'/>
                    <Display displaytext= {this.state.display} id='inner-display'/>
                </div>

                <div className='keys'> 
                    <Row className='g-0'> 
                        <Col className=" d-flex justify-content-center">
                        {this.numKey('AC', 'clear')}
                        </Col>
                        <Col className=" d-flex justify-content-center">
                        {this.numKey('^', 'exp')}
                        </Col >
                        <Col className=" d-flex justify-content-center">
                        {this.perKey('%', 'percent')}
                        </Col>
                        <Col className=" d-flex justify-content-center">
                        {this.numKey('/', 'divide')}
                        </Col>
                    </Row>

                    <Row className='g-0'>
                        <Col className=" d-flex justify-content-center"> 
                            {this.numKey(9, 'nine')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                            {this.numKey(8, 'eight')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                            {this.numKey(7, 'seven')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                            {this.numKey('x', 'multiply')}
                        </Col>
                    </Row>

                    <Row className='g-0'>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey(6, 'six')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey(5, 'five')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey(4, 'four')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey('-', 'subtract')}
                        </Col>
                        
                    </Row>

                    <Row className='g-0'>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey(3, 'three')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey(2, 'two')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey(1, 'one')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey('+', 'add')}
                        </Col>
                    </Row>
                    
                    <Row className='g-0'>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey('C', 'backspace')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey(0, 'zero')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                        {this.numKey('.', 'decimal')}
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                        {this.equalKey('=', 'equals')}
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}


  // ========================================
  
  ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
  );
  