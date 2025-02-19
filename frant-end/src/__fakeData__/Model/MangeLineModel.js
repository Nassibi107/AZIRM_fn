
export default class MangeLineModel {
    constructor(lineId, status, userName ,password ,
         expiredate , dns,owner , maxConnections ,info =  {
        "pay": "CardPaid",
        "video": "NoVideo",
        "web": "web"
      },  ) 
    {
        this.lineId = lineId ;
        this.status = status
        this.userName = userName
        this.password = password
        this.expiredate = expiredate
        this.dns = dns
        this.owner = owner
        this.maxConnections = maxConnections
        this.info = info
    }
  }