import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import _ from 'lodash';

class Home extends Component {
    render() {
        return (
            <div onClick={() => {console.log(2345)}}>
                {
                    _.map([1, 2, 3], value => value)
                }
            </div>
        );
    }
}
 
export default Home;
// ReactDOM.render(<App />, document.getElementById('app'));
