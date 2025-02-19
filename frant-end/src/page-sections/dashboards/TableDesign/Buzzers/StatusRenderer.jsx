import { OnlineBuzz, OfflineBuzz, BanBuzz, BlockBuzz, ActiveBuzz, InactiveBuzz } from "./Buzzer";

const StatusRenderer = ({ status }) => {
  switch (status) {
    case 'active':
      return <ActiveBuzz />
    case 'online':
      return <OnlineBuzz />;
    case 'offline':
      return <OfflineBuzz />;
    case 'ban':
        return <BanBuzz />;
    case 'blocked':
      return <BlockBuzz />;
    case 'inactive':
      return <InactiveBuzz />;
    default:
      return null;
  }
};

export default StatusRenderer;
