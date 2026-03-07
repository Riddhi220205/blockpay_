// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Subscription {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Plan {
        uint256 id;
        string name;
        uint256 price;
        uint256 duration;
    }

    struct SubscriptionInfo {
        address user;
        uint256 planId;
        uint256 startDate;
        bool active;
    }

    uint256 public planCount;

    mapping(uint256 => Plan) public plans;
    mapping(address => SubscriptionInfo) public subscriptions;

    event PlanCreated(uint256 planId, string name, uint256 price, uint256 duration);
    event Subscribed(address user, uint256 planId);
    event SubscriptionCancelled(address user);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    function createPlan(
        string memory _name,
        uint256 _price,
        uint256 _duration
    ) public onlyOwner {

        planCount++;

        plans[planCount] = Plan(
            planCount,
            _name,
            _price,
            _duration
        );

        emit PlanCreated(planCount, _name, _price, _duration);
    }

    function subscribe(uint256 _planId) public payable {

        Plan memory plan = plans[_planId];

        require(plan.price > 0, "Plan does not exist");
        require(msg.value >= plan.price, "Insufficient payment");

        subscriptions[msg.sender] = SubscriptionInfo(
            msg.sender,
            _planId,
            block.timestamp,
            true
        );

        emit Subscribed(msg.sender, _planId);
    }

    function cancelSubscription() public {

        require(subscriptions[msg.sender].active, "No active subscription");

        subscriptions[msg.sender].active = false;

        emit SubscriptionCancelled(msg.sender);
    }

    function getSubscription(address _user)
        public
        view
        returns (SubscriptionInfo memory)
    {
        return subscriptions[_user];
    }
}