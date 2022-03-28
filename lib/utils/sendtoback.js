export function sendtoback(coordinates, image_data, backAddress){
    var body = JSON.stringify({ "image": image_data, "coordinates": {"latitude": coordinates[0], "longitude": coordinates[1]}});
    var head = { "Content-Type" : "application/json"};
    fetch(backAddress + "/api/v1/ia/give_trash", { method: "POST", headers: head, body: body })
        .then((result) => { return result.json() })
        .then((data) => {
            console.log(data.processed_coordinates);
            const user_coordinates = data.processed_coordinates.user_coordinates;
            const target_coordinates = data.processed_coordinates.target_coordinates;
            const user_latitude = user_coordinates.latitude
            const user_longitude = user_coordinates.longitude
            const target_latitude = target_coordinates.latitude
            const target_longitude = target_coordinates.longitude
            const target_type = data.container_type;
            document.location = `/rendermap?user_latitude=${user_latitude}&user_longitude=${user_longitude}&target_latitude=${target_latitude}&target_longitude=${target_longitude}&target_type=${target_type}`;
        })
}