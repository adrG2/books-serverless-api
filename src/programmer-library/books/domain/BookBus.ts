export default interface BookBus {
    send(body: object | any): Promise<void>;
}