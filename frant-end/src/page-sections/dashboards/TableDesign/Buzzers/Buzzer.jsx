import './Buzzer.css';

const OnlineBuzz = () => {
    return (
        <div className="holderBuzz">
            <div className="BuzzOnline"></div>
            <div className="BuzzOnlineBase"></div>
            <div className="BuzzTicket BuzzOnlineColor">Online</div>
        </div>
    );
}

const ActiveBuzz = () => {
    return (
        <div className="holderBuzz">
            <div className="BuzzOnline"></div>
            <div className="BuzzOnlineBase"></div>
            <div className="BuzzTicket BuzzOnlineColor">Active</div>
        </div>
    );
}

const OfflineBuzz = () => {
    return (
        <div className="holderBuzz">
            <div className="OfflineBuzz"></div>
            <div className="BuzzTicket BuzzOfflineColor">Offline</div>
        </div>
    );
}

const InactiveBuzz = () => {
    return (
        <div className="holderBuzz">
            <div className="OfflineBuzz"></div>
            <div className="BuzzTicket BuzzOfflineColor">InActive</div>
        </div>
    );
}


const BanBuzz = () => {
    return (
        <div className="holderBuzz">
            <div className="BanBuzz"></div>
            <div className="BuzzTicket BuzzBaneColor">Banned</div>
        </div>
    );
}

const BlockBuzz = () => {
    return (
        <div className="holderBuzz">
            <div className="BlockBuzz"></div>
            <div className="BuzzTicket BuzzBlockColor">Blocked</div>
        </div>
    );
}

export {
    OnlineBuzz,
    ActiveBuzz,
    OfflineBuzz,
    BanBuzz,
    BlockBuzz,
    InactiveBuzz,
};

export default OnlineBuzz;