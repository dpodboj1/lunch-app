import React, { Component, PropTypes } from 'react';
import Restaurant from './Restaurant';
import { database } from './firebase';
import map from 'lodash/map';
import './Restaurants.css';

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDeselect = this.handleDeselect.bind(this);
  }

  handleSelect(key) {
    const currentUser = this.props.user;
    database.ref("/restaurants").child(key).child("votes").child(currentUser.uid).set(currentUser.displayName);
  }

  handleDeselect(key) {
    const currentUser = this.props.user;
    database.ref("/restaurants").child(key).child("votes").child(currentUser.uid).remove();
  }

  render () {
    const {user, restaurants} = this.props;
    return (
      <section className="Restaurants">
        {map(restaurants, (restaurant, key) =>
          <Restaurant key={key} {...restaurant} user={user} handleSelect={() => this.handleSelect(key)} handleDeselect={() => this.handleDeselect(key)}  />
        )}
      </section>
    );
  }
}

Restaurants.propTypes = {
  user: PropTypes,
  restaurantsRef: PropTypes.object,
  restaurants: PropTypes.object
};

export default Restaurants;
