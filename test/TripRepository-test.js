import chai from 'chai';
const expect = chai.expect;

import TripRepository from '../src/classes/TripRepository.js'
import Traveler from '../src/classes/Traveler.js'
import Trip from '../src/classes/Trip.js'
import Destination from '../src/classes/Destination.js'
import tripData from '../data/sample-tripData.js'
import travelerData from '../data/sample-travelerData.js'
import destinationData from '../data/sample-destinationData.js'

describe('TripRepository', () => {
  let destinations;
  let trips;
  let traveler1;
  let traveler2;
  let traveler3;
  let tripRepo1;
  let tripRepo2;
  let tripRepo3;

  beforeEach( () => {
    destinations = destinationData.map(destination => new Destination(destination));
    trips = tripData.map(trip => new Trip(trip));
    traveler1 = new Traveler(travelerData[1]);
    traveler2 = new Traveler(travelerData[3]);
    traveler3 = new Traveler(travelerData[5]);
    tripRepo1 = new TripRepository(traveler1, trips);
    tripRepo2 = new TripRepository(traveler2, trips);
    tripRepo3 = new TripRepository(traveler3, trips);
  });

  it('should be a function', () => {
    expect(TripRepository).to.be.a('function');
  });

  it('should be an instance of TripRepository', () => {
    expect(tripRepo1).to.be.an.instanceOf(TripRepository);
    expect(tripRepo2).to.be.an.instanceOf(TripRepository);
    expect(tripRepo3).to.be.an.instanceOf(TripRepository);
  });

  it('should have all of the trips for a given traveler', () => {
    expect(tripRepo1.allTravelerTrips).to.deep.equal([
      { id: 20, userID: 2, destinationID: 5, travelers: 4, date: '2023/10/05', duration: 6, status: 'pending', suggestedActivities: [] },
      { id: 17, userID: 2, destinationID: 8, travelers: 1, date: '2022/10/30', duration: 20, status: 'approved', suggestedActivities: [] },
      { id: 8, userID: 2, destinationID: 17, travelers: 6, date: '2022/03/07', duration: 4, status: 'approved', suggestedActivities: [] },
      { id: 5, userID: 2, destinationID: 20, travelers: 3, date: '2021/04/30', duration: 18, status: 'approved', suggestedActivities: [] }
    ]);
    expect(tripRepo2.allTravelerTrips).to.deep.equal([
      { id: 22, userID: 4, destinationID: 3, travelers: 4, date: '2023/05/01', duration: 19, status: 'pending', suggestedActivities: [] },
      { id: 15, userID: 4, destinationID: 10, travelers: 3, date: '2022/12/04', duration: 6, status: 'approved', suggestedActivities: [] },
      { id: 10, userID: 4, destinationID: 15, travelers: 6, date: '2022/01/23', duration: 17, status: 'approved', suggestedActivities: [] },
      { id: 3, userID: 4, destinationID: 22, travelers: 4, date: '2021/05/22', duration: 17, status: 'approved', suggestedActivities: [] }
    ]);
    expect(tripRepo3.allTravelerTrips).to.deep.equal([
      { id: 24, userID: 6, destinationID: 1, travelers: 5, date: '2023/11/15', duration: 7, status: 'pending', suggestedActivities: [] },
      { id: 13, userID: 6, destinationID: 12, travelers: 1, date: '2022/11/12', duration: 11, status: 'approved', suggestedActivities: [] },
      { id: 12, userID: 6, destinationID: 13, travelers: 6, date: '2022/07/17', duration: 6, status: 'approved', suggestedActivities: [] },
      { id: 1, userID: 6, destinationID: 24, travelers: 1, date: '2021/09/16', duration: 8, status: 'approved', suggestedActivities: [] }
    ]);
  });

  it('should have all past trips for a given traveler', () => {
    expect(tripRepo1.pastTrips).to.deep.equal([
      { id: 8, userID: 2, destinationID: 17, travelers: 6, date: '2022/03/07', duration: 4, status: 'approved', suggestedActivities: [] },
      { id: 5, userID: 2, destinationID: 20, travelers: 3, date: '2021/04/30', duration: 18, status: 'approved', suggestedActivities: [] }
    ]);
    expect(tripRepo2.pastTrips).to.deep.equal([
      { id: 10, userID: 4, destinationID: 15, travelers: 6, date: '2022/01/23', duration: 17, status: 'approved', suggestedActivities: [] },
      { id: 3, userID: 4, destinationID: 22, travelers: 4, date: '2021/05/22', duration: 17, status: 'approved', suggestedActivities: [] }
    ]);
    expect(tripRepo3.pastTrips).to.deep.equal([
      { id: 12, userID: 6, destinationID: 13, travelers: 6, date: '2022/07/17', duration: 6, status: 'approved', suggestedActivities: [] },
      { id: 1, userID: 6, destinationID: 24, travelers: 1, date: '2021/09/16', duration: 8, status: 'approved', suggestedActivities: [] }
    ]);
  });

  it('should have any upcoming trips for a given traveler', () => {
    expect(tripRepo1.upcomingTrips).to.deep.equal([
      { id: 17, userID: 2, destinationID: 8, travelers: 1, date: '2022/10/30', duration: 20, status: 'approved', suggestedActivities: [] }
    ]);
    expect(tripRepo2.upcomingTrips).to.deep.equal([
      { id: 15, userID: 4, destinationID: 10, travelers: 3, date: '2022/12/04', duration: 6, status: 'approved', suggestedActivities: [] }
    ]);
    expect(tripRepo3.upcomingTrips).to.deep.equal([
      { id: 13, userID: 6, destinationID: 12, travelers: 1, date: '2022/11/12', duration: 11, status: 'approved', suggestedActivities: [] }
    ]);
  });

  it('should have any pending trips for a given traveler', () => {
    expect(tripRepo1.pendingTrips).to.deep.equal([
      { id: 20, userID: 2, destinationID: 5, travelers: 4, date: '2023/10/05', duration: 6, status: 'pending', suggestedActivities: [] }
    ]);
    expect(tripRepo2.pendingTrips).to.deep.equal([
      { id: 22, userID: 4, destinationID: 3, travelers: 4, date: '2023/05/01', duration: 19, status: 'pending', suggestedActivities: [] }
    ]);
    expect(tripRepo3.pendingTrips).to.deep.equal([
      { id: 24, userID: 6, destinationID: 1, travelers: 5, date: '2023/11/15', duration: 7, status: 'pending', suggestedActivities: [] }
    ]);
  });

  it('should get the total lodging cost spent for the current year to date', () => {
    expect(tripRepo1.getTravelCostForYearToDate(destinations, 'lodgingCost', 'duration')).to.equal('2620.00');
    expect(tripRepo2.getTravelCostForYearToDate(destinations, 'lodgingCost', 'duration')).to.equal('1220.00');
    expect(tripRepo3.getTravelCostForYearToDate(destinations, 'lodgingCost', 'duration')).to.equal('2250.00');
  });

  it('should get the total cost spent on flight for the current year to date', () => {
    expect(tripRepo1.getTravelCostForYearToDate(destinations, 'flightCost', 'travelers')).to.equal('8200.00');
    expect(tripRepo2.getTravelCostForYearToDate(destinations, 'flightCost', 'travelers')).to.equal('6750.00');
    expect(tripRepo3.getTravelCostForYearToDate(destinations, 'flightCost', 'travelers')).to.equal('7800.00');
  });

  it('should get the total cost spent on trips for the current year to date', () => {
    expect(tripRepo1.getTotalSpentForYearToDate(destinations)).to.equal('11902.00');
    expect(tripRepo2.getTotalSpentForYearToDate(destinations)).to.equal('8767.00');
    expect(tripRepo3.getTotalSpentForYearToDate(destinations)).to.equal('11055.00');
  });
});