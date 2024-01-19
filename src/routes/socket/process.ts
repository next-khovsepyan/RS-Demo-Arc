import { ProcessService } from "../../services/socket/process.service";
import { socketBodyParser } from "../../utils/json.parser";
import { Socket } from 'socket.io';

export async function ProcessSocketRoute(socket: Socket) {
  socket.on('start', function (data, image, ack) {
    // In this function we start socket process
    // ProcessService.start(image, data, socket, ack) 
  })
}