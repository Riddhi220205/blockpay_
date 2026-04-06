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
        uint256 price;     // in wei
        uint256 duration;  // in seconds
    }

    struct SubscriptionInfo {
        address user;
        uint256 planId;
        uint256 startDate;
        uint256 endDate;   // ← Added: better to track expiry
        bool active;
    }

    uint256 public planCount;
    mapping(uint256 => Plan) public plans;
    mapping(address => SubscriptionInfo) public subscriptions;

    event PlanCreated(uint256 planId, string name, uint256 price, uint256 duration);
    event Subscribed(address indexed user, uint256 planId, uint256 endDate);
    event SubscriptionCancelled(address indexed user);

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
        plans[planCount] = Plan(planCount, _name, _price, _duration);
        emit PlanCreated(planCount, _name, _price, _duration);
    }

    function subscribe(uint256 _planId) public payable {
        Plan memory plan = plans[_planId];
        require(plan.price > 0, "Plan does not exist");
        require(msg.value >= plan.price, "Insufficient payment");

        uint256 endDate = block.timestamp + plan.duration;

        subscriptions[msg.sender] = SubscriptionInfo(
            msg.sender,
            _planId,
            block.timestamp,
            endDate,
            true
        );

        // Refund extra payment if any
        if (msg.value > plan.price) {
            payable(msg.sender).transfer(msg.value - plan.price);
        }

        emit Subscribed(msg.sender, _planId, endDate);
    }

    function cancelSubscription() public {
        require(subscriptions[msg.sender].active, "No active subscription");
        subscriptions[msg.sender].active = false;
        emit SubscriptionCancelled(msg.sender);
    }

    // Optional: Check if subscription is still valid
    function isSubscriptionActive(address _user) public view returns (bool) {
        SubscriptionInfo memory sub = subscriptions[_user];
        return sub.active && block.timestamp < sub.endDate;
    }

    function getSubscription(address _user)
        public
        view
        returns (SubscriptionInfo memory)
    {
        return subscriptions[_user];
    }

    // Withdraw funds (owner only)
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
