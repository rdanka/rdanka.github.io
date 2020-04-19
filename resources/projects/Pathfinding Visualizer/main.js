 const pathFindingButton = document.querySelector('.findPath');

 let newLocation;

 // Start location will be in the following format:
 // [yPos, xPos]
 let findShortestPath = function (startCoordinates, grid) {
     let yPos = startCoordinates[0];
     let xPos = startCoordinates[1];

     // Each "location" will store its coordinates
     // and the shortest path required to arrive there
     let location = {
         yPos: yPos,
         xPos: xPos,
         path: [],
         status: 'Start'
     };

     // Initialize the queue with the start location already inside
     let queue = [location];

     // Loop through the grid searching for the goal

     let loop = setInterval(() => {
         // Take the first location off the queue
         let currentLocation = queue.shift();


         // Explore Up
         newLocation = exploreInDirection(currentLocation, 'Up', grid);
         if (newLocation.status === 'Goal') {
             clearInterval(loop);
             draw([start.y, start.x], grid);
             return newLocation.path;
         } else if (newLocation.status === 'Valid') {
             queue.push(newLocation);
         }

         // Explore Right
         newLocation = exploreInDirection(currentLocation, 'Right', grid);
         if (newLocation.status === 'Goal') {
             clearInterval(loop);
             draw([start.y, start.x], grid);
             return newLocation.path;
         } else if (newLocation.status === 'Valid') {
             queue.push(newLocation);
         }

         // Explore Down
         newLocation = exploreInDirection(currentLocation, 'Down', grid);
         if (newLocation.status === 'Goal') {
             clearInterval(loop);
             draw([start.y, start.x], grid);
             return newLocation.path;
         } else if (newLocation.status === 'Valid') {
             queue.push(newLocation);
         }

         // Explore Left
         newLocation = exploreInDirection(currentLocation, 'Left', grid);
         if (newLocation.status === 'Goal') {
             clearInterval(loop);
             draw([start.y, start.x], grid);
             return newLocation.path;
         } else if (newLocation.status === 'Valid') {
             queue.push(newLocation);
         }
     }, 0);
     // No valid path found
     return false;

 };

 // This function will check a location's status
 // (a location is "valid" if it is on the grid, is not an "obstacle",
 // and has not yet been visited by our algorithm)
 // Returns "Valid", "Invalid", "Blocked", or "Goal"
 let locationStatus = function (location, grid) {
     let dft = location.yPos;
     let dfl = location.xPos;

     if (location.xPos < 0 ||
         location.xPos >= gridWidth ||
         location.yPos < 0 ||
         location.yPos >= gridHeight) {

         // location is not on the grid--return false
         return 'Invalid';
     } else if (grid[dft][dfl] === 'Goal') {
         return 'Goal';
     } else if (grid[dft][dfl] !== 'Empty') {
         // location is either an obstacle or has been visited
         return 'Blocked';
     } else {
         return 'Valid';
     }
 };


 // Explores the grid from the given location in the given
 // direction
 let exploreInDirection = function (currentLocation, direction, grid) {
     let newPath = currentLocation.path.slice();
     newPath.push(direction);
     let dft = currentLocation.yPos;
     let dfl = currentLocation.xPos;

     if (direction === 'Up') {
         dft -= 1;
     } else if (direction === 'Right') {
         dfl += 1;
     } else if (direction === 'Down') {
         dft += 1;
     } else if (direction === 'Left') {
         dfl -= 1;
     }

     let newLocation = {
         yPos: dft,
         xPos: dfl,
         path: newPath,
         status: 'Unknown'
     };
     newLocation.status = locationStatus(newLocation, grid);

     // If this new location is valid, mark it as 'Visited'
     if (newLocation.status === 'Valid') {
         grid[newLocation.yPos][newLocation.xPos] = 'Visited';
         setTimeout(() => {
             gridContainer.childNodes[newLocation.yPos].childNodes[newLocation.xPos].classList.add("visited");

         }, 100);
         gridContainer.childNodes[newLocation.yPos].childNodes[newLocation.xPos].style.backgroundColor = "red";
     }

     return newLocation;
 };
 pathFindingButton.addEventListener('click', () => {
     console.log(findShortestPath([start.y, start.x], grid));
 });

 function draw(startingPos, grid) {
     let currentPos = {
         x: startingPos[1],
         y: startingPos[0]
     };
     let i = 0;
     console.log(currentPos);
     let loop = setInterval(() => {

         let direction = newLocation.path[i];

         console.log(newLocation.path[i]);

         gridContainer.childNodes[currentPos.y].childNodes[currentPos.x].classList.add("path");
         if (direction === 'Up') {
             currentPos.y -= 1;
             console.log('Up:', currentPos);
         } else if (direction === 'Right') {
             currentPos.x += 1;
             console.log('Right:', currentPos);
         } else if (direction === 'Down') {
             currentPos.y += 1;
             console.log('Down:', currentPos);
         } else if (direction === 'Left') {
             currentPos.x -= 1;
             console.log('Left:', currentPos);
         }

         i++;
         if (i > newLocation.path.length) {
             clearInterval(loop);
         }
     }, 100);

 }
 // OK. We have the functions we need--let's run them to get our shortest path!

 //console.log(findShortestPath([start.y, start.x], grid)); ,