package com.lavapm.enterprise.common.constant;





public class CommonConstant
{
  public static final String RESET_PASSWORD_COUNT_CACHE = "resetPasswordCountCache";
  



  public static final String RESET_PASSWORD_TOKEN_CACHE = "resetPasswordTokenCache";
  



  public static final String DCDS_ROLE_PREFIX = "SMS_PLATFORM_";
  



  public static final String SYSTEM_PARAM_ATTACHMENT_PATH = "ATTACHMENT_PATH";
  



  public static final String SYSTEM_PARAM_JOB_MAX_RETRY = "JOB_MAX_RETRY";
  



  public static final String SEND_HOST_IP = "SEND_HOST_IP";
  



  public static final String SEND_HOST_PORT = "SEND_HOST_PORT";
  



  public static final String FILE_SEPARATOR = "/";
  



  public static final int HADOOP_SEND_JOB_STATUS_INCOMPLATE = 0;
  



  public static final int HADOOP_SEND_JOB_STATUS_RUNNING = 1;
  



  public static final int HADOOP_SEND_JOB_STATUS_COMPLETE = 2;
  



  public static final int HADOOP_SEND_JOB_STATUS_EXCEPTION = -1;
  



  public static final int HADOOP_SEND_JOB_STATUS_FORBIDDEN_TIME = -2;
  



  public static final int PAUSE_STATUS_1 = 1;
  



  public static final int PAUSE_STATUS_2 = 2;
  



  public static final String EMAIL_SERVER_CONFIG = "emailServerConfig";
  



  public static final String SYSTEM_PARAM_CACHE_ELEMENT_KEY = "systemparamkey";
  



  public static final String SYSTEM_PARAM_CACHE_NAME = "finSystemParam";
  



  public static final String PAGE_LIST_DATA_ROWS = "rows";
  



  public static final String PAGE_LIST_DATA_TOTAL = "total";
  



  public static final String GRID_FOOTER = "footer";
  



  public static final String CACHE_DIC_MAP = "cache_dic_map";
  



  public static final String CACHE_SUB_DIC_MAP = "cache_sub_dic_map";
  



  public static final String FIN_DIC_POINTS_SALES_TYPE = "PointsSalesType";
  



  public static final String FIN_DIC_POINTS_COST_CENTER = "costcenter";
  



  public static final String FIN_DIC_POINTS_SALES_ATTACHMENT_TYPE = "PointsSalesAttachmentType";
  



  public static final String FIN_DIC_OPRATER_TYPE = "opraterType";
  


  public static final String FIN_DIC_STATUS_TYPE = "invoiceStatus";
  


  public static final String ORDER_TYPE_SALES_OUT = "SO";
  


  public static final String ORDER_TYPE_SALES_IN = "SI";
  


  public static final String TIMEOUT_TASK_EMAIL_TEMP_CODE = "TimeoutTask";
  


  public static final String FAILINJECT_TASK_TEMP_CODE = "FailInjectTask";
  


  public static final String UM_EMAIL_SERVER_CODE = "PasswordEditCode";
  


  public static final String UM_EMAIL_RESET_PASSWORD_TEMPLATE = "PasswordEditCodeTemplate";
  


  public static final String ResetPasswordURLTemplate = "ResetPasswordURLTemplate";
  


  public static final String FINANCE_EMAIL_SERVER_CODE = "FinanceEmailServiceCode";
  


  public static final String FINANCE_EMAIL_RECEIVE_SERVER_CODE = "FinanceEmailReceiveServiceCode";
  


  public static final String TASK_ATTACHMENT_VALIDATE_PASS = "TaskAttachmentValidatePass";
  


  public static final String TASK_ATTACHMENT_VALIDATE_NO_PASS = "TaskAttachmentValidateNoPass";
  


  public static final String ATTACHMENT_VALIDATE_NO_PASS = "attachmentValidateNoPass";
  


  public static final String ATTACHMENT_VALIDATE_PASS = "attachmentValidatePass";
  


  public static final Integer EMAIL_STATUS_NO = Integer.valueOf(1);
  public static final Integer EMAIL_STATUS_YES = Integer.valueOf(2);
  public static final Integer EMAIL_STATUS_RETRY = Integer.valueOf(3);
  public static final Integer EMAIL_STATUS_SYNC = Integer.valueOf(4);
  public static final Integer EMAIL_STATUS_ERROR = Integer.valueOf(-1);
  public static final Integer EMAIL_STATUS_NO_SYNC = Integer.valueOf(-2);
  



  public static final Integer EMAIL_RECEIVE_STATUS_RECEIVEED = Integer.valueOf(1);
  public static final Integer EMAIL_RECEIVE_STATUS_PROCESSED = Integer.valueOf(2);
  public static final Integer EMAIL_RECEIVE_STATUS_ERROR = Integer.valueOf(-1);
  public static final Integer EMAIL_RECEIVE_STATUS_NO_SYNC = Integer.valueOf(-2);
  



  public static final String SESSION_USER_FLAG = "user";
  



  public static final String SESSION_USER_DATAAUTHOR = "UserDataAuthor";
  



  public static final int POINTS_SALES_ORDER_STATUS_UNCOMMIT = 1;
  



  public static final int POINTS_SALES_ORDER_STATUS_COMMIT = 2;
  



  public static final int POINTS_SALES_ORDER_STATUS_NO_PASS = 3;
  



  public static final int POINTS_SALES_ORDER_STATUS_COMPLETE = 4;
  



  public static final int POINTS_SALES_ORDER_STATUS_ATTACHEMENT_VALIDATE = 5;
  



  public static final int POINTS_SALES_ORDER_STATUS_ATTACHEMENT_NO_PASS = 6;
  



  public static final int POINTS_SALES_ORDER_STATUS__PASS = 8;
  



  public static final int POINTS_SALES_ORDER_STATUS_SUSPEND = -1;
  



  public static final int POINTS_SALES_ORDER_STATUS_CANCEL = -2;
  



  public static final int ORDER_ACTIVATE_STATUS_NO = 0;
  



  public static final int ORDER_ACTIVATE_STATUS_PART = 2;
  



  public static final int ORDER_ACTIVATE_STATUS_ALL = 3;
  



  public static final int ACTIVATE_STATUS_NO = 1;
  



  public static final int ACTIVATE_STATUS_ING = 2;
  



  public static final int ACTIVATE_STATUS_YES = 3;
  



  public static final int ACTIVATE_STATUS_DISAGREE = 4;
  



  public static final String ARCHIVE_STATUS_NO = "0";
  



  public static final String ARCHIVE_STATUS_YES = "1";
  



  public static final int POINTS_SALES_ORDER_STATUS_ON_FILE = -100;
  



  public static final int POINTS_SALES_ORDER_INVOICE_STATUS_NO_APPLY = 0;
  



  public static final int POINTS_SALES_ORDER_INVOICE_STATUS_APPLY = 1;
  



  public static final int POINTS_SALES_ORDER_INVOICE_STATUS_APPLYING = 2;
  



  public static final int POINTS_SALES_ORDER_INVOICE_STATUS_FINISHED = 3;
  



  public static final int POINTS_SALES_ORDER_INVOICE_STATUS_NO_WAY = -1;
  



  public static final int POINTS_SALES_ORDER_INVOICE_STATUS_CANCELED = -2;
  



  public static final int POINTS_SALES_CANCEL_STATUS_NO_APPLY = 0;
  



  public static final int POINTS_SALES_CANCEL_STATUS_APPLYING = 1;
  



  public static final int POINTS_SALES_CANCEL_STATUS_SUCCESS = 2;
  



  public static final int POINTS_SALES_CANCEL_STATUS_FAIL = 3;
  



  public static final int POINTS_SALES_CANCEL_STATUS_CANCELED = -1;
  



  public static final int CANCEL_SHEET_STATUS_NOSUBMIT = 0;
  



  public static final int CANCEL_SHEET_STATUS_SUBMITTED = 1;
  



  public static final int CANCEL_SHEET_STATUS_FINISHED = 2;
  



  public static final int CANCEL_SHEET_STATUS_APPLYNOTPASS = 3;
  



  public static final int CANCEL_SHEET_STATUS_CANCELED = -1;
  



  public static final int CANCEL_SHEET_STATUS_APPROVED = 8;
  



  public static final int POINTS_TX_TYPE_RECHARGE = 1;
  



  public static final int POINTS_TX_TYPE_REDUCE = 2;
  



  public static final int POINTS_TX_TYPE_CANCEL_ADD = -1;
  



  public static final int POINTS_TX_TYPE_CANCEL_REDUCE = -2;
  



  public static final int POINTS_TX_TYPE_ADMIN_ADD = 12;
  



  public static final int POINTS_TX_TYPE_ADMIN_REDUCE = -12;
  



  public static final int POINTS_SALES_ORDER_PAYSTATUS_NO_RECEIVE_MONEY = 1;
  



  public static final int POINTS_SALES_ORDER_STARTREDEEM_NO = 0;
  



  public static final int POINTS_SALES_ORDER_STARTREDEEM_YES = 1;
  



  public static final String RESPONSE_SEND_PAGE_ERROR_MSG = "errorMsg";
  



  public static final String RESPONSE_SEND_PAGE_SUCCESS_MSG = "successMsg";
  



  public static final String WARN_INFO = "warnInfo";
  



  public static final String RESPONSE_SEND_PAGE_MSG = "msg";
  



  public static final String PAGE_ACTION = "act";
  



  public static final String PAGE_ACTION_ADD = "add";
  



  public static final String PAGE_ACTION_UPDATE = "update";
  



  public static final String PAGE_ACTION_SHOW = "show";
  



  public static final String PAGE_ACTION_ACTIVATE = "activate";
  



  public static final String ATTACHEMENT_TYPE_POINT_SALES = "point";
  



  public static final String FIN_DIC_POINTS_PRODUCT_TYPE = "PointsProductType";
  



  public static final String FIN_DIC_POINTS_PRODUCT_SALES_TYPE = "PointsProductSalesType";
  



  public static final String FIN_DIC_PRODUCT_FACE_VALUE = "product_face_value";
  



  public static final int ORDER_ITEM_TYPE = 1;
  



  public static final int REDEEM_ITEM_TYPE = 2;
  



  public static final String OA_TASK_STATUS = "oaTaskStatus";
  



  public static final String INVOICE_EQUEST_PROCESS = "InvoiceRequestProcess";
  



  public static final String ORDER_INVOICE_EQUEST_PROCESS = "OrderInvoiceProcess";
  



  public static final String INVOICE_REQUEST_PROCESS_TYPE = "IA";
  



  public static final String SYSTEM_CODE_FINANCE = "Finance";
  



  public static final String SYSTEM_CODE_UM = "UM";
  



  public static final String AUDIT_LOG_OPERATION_TYPE_STOP_PROCESS = "1";
  



  public static final String AUDIT_LOG_OPERATION_TYPE_RE_ASSIGNEE = "2";
  



  public static final String AUDIT_LOG_OPERATION_TYPE_TAKEOVER = "3";
  



  public static final String AUDIT_LOG_TARGET_TYPE_PROCESS = "1";
  



  public static final String AUDIT_LOG_TARGET_TYPE_TASK = "2";
  



  public static final String AUDIT_LOG_TARGET_TYPE_TAKEOVER = "3";
  



  public static final String AUDIT_LOG_RESULT_YES = "1";
  



  public static final String AUDIT_LOG_RESULT_NO = "2";
  



  public static final String DIC_ITEM_AUDIT_OPERATION_TYPE = "AuditOperationType";
  



  public static final String DIC_ITEM_AUDIT_TARGET_TYPE = "AuditTargetType";
  



  public static final String DIC_ITEM_AUDIT_RESULT_TYPE = "AuditResultType";
  



  public static final String DIC_ITEM_POINTSTXTYPE_RESULT_TYPE = "PointsTxType";
  



  public static final String DIC_ITEM_POINT_RULE_CODE = "POINT_RULE_CODE";
  



  public static final int POINTS_SALES_ORDER_REDEEM_STATUS_NO = 0;
  



  public static final int POINTS_SALES_ORDER_REDEEM_STATUS_NEED = 1;
  



  public static final int POINTS_SALES_ORDER_REDEEM_STATUS_ING = 2;
  



  public static final int POINTS_SALES_ORDER_REDEEM_STATUS_FINISH = 3;
  



  public static final int POINTS_SALES_ORDER_REDEEM_STATUS_ATTACHMENT_VALIDATE_ING = 4;
  


  public static final int POINTS_SALES_ORDER_REDEEM_STATUS_ATTACHMENT_VALIDATE_NO_PASS = 5;
  


  public static final int POINTS_SALES_ORDER_REDEEM_STATUS_NO_APPLY = -1;
  


  public static final int POINTS_SALES_ORDER_REDEEM_STATUS_NO_APPROVED = -2;
  


  public static final int POINTS_SALES_ORDER_REDEEM_STATUS_CANCELED = -3;
  


  public static final int POINTS_PRODUCT_SALES_TYPE_TC = 1;
  


  public static final int POINTS_PRODUCT_SALES_TYPE_TP = 2;
  


  public static final int POINTS_PRODUCT_SALES_TYPE_TG = 3;
  


  public static final int POINTS_PRODUCT_SALES_TYPE_POINTS = 4;
  


  public static final int CANCEL_SHEET_TYPE_ORDER = 11;
  


  public static final int CANCEL_SHEET_TYPE_REDEEM = 12;
  


  public static final int TCREFUND_TYPE_ORDER = 21;
  


  public static final int TCREFUND_TYPE_REDEEM = 22;
  


  public static final String OA_TEMPLATE_POINT_SELL = "PointSellTemplate";
  


  public static final String OA_TEMPLATE_ADD_POINT_SELL = "AddPointSellTemplate";
  


  public static final String OA_TEMPLATE_TICKET_CARD_SELL = "TicketCardSellTemplate";
  


  public static final String OA_TEMPLATE_VIRTUAL_TRADE_SELL = "VirtualTradeSellTemplate";
  


  public static final int POINTS_SALES_USEPOINTS_STATUS_UNCOMMIT = 1;
  


  public static final int POINTS_SALES_USEPOINTS_STATUS_COMMIT = 2;
  


  public static final int POINTS_SALES_USEPOINTS_STATUS_VERIFY = 5;
  


  public static final int POINTS_SALES_USEPOINTS_STATUS_CANCEL = -2;
  


  public static final String REDEEM_TYPE_TC = "TC";
  


  public static final String REDEEM_TYPE_TP = "TP";
  


  public static final String REDEEM_TYPE_TG = "TG";
  


  public static final String SELL_PROCESS_TC = "TicketCardSellProcess";
  


  public static final String SELL_PROCESS_TP = "AddPointSellProcess";
  


  public static final String SELL_PROCESS_TG = "VirtualTradeSellProcess";
  


  public static final String SELL_PROCESS_POINT = "PointSellProcess";
  


  public static final String TICKET_CARD_ACTIVATE_PROCESS = "ActivateProcess";
  


  public static final int INVOICE_STATUS_ING = 2;
  


  public static final int INVOICE_STATUS_YES = 3;
  


  public static final int INVOICE_STATUS_CANCEL = -2;
  


  public static final int INVOIC_SHEET_TYPE_ORDER = 1;
  


  public static final int INVOIC_SHEET_TYPE_RETURN = 2;
  


  public static final String ROLE_CODE_TD_BUYER = "FINANCE_ROLE_PurchaseStaff";
  


  public static final String OA_TEMPLATE_REDEEM_TC = "TicketCardRedeemTemplate";
  


  public static final String OA_TEMPLATE_REDEEM_TP = "AddPointRedeemTemplate";
  


  public static final String OA_TEMPLATE_REDEEM_TG = "VirtualTradeRedeemTemplate";
  


  public static final String OA_TEMPLATE_ORDERCANCEL = "OrderCancelTemplate";
  


  public static final String OA_TEMPLATE_ORDER_INVOICE_CANCEL = "OrderInvoiceCancelTemplate";
  


  public static final String OA_TEMPLATE_REDEEMCANCEL = "RedeemCancelTemplate";
  


  public static final String OA_TEMPLATE_TCORDERREFUND = "TCOrderRefundTemplate";
  


  public static final String OA_TEMPLATE_TCORDER_INVOICE_REFUND = "TCOrderInvoiceRefundTemplate";
  


  public static final String OA_TEMPLATE_TCREDEEMREFUND = "TCRedeemRefundTemplate";
  


  public static final String REDEEM_PROCESS_TC = "TicketCardRedeemProcess";
  


  public static final String REDEEM_PROCESS_TP = "AddPointRedeemProcess";
  


  public static final String REDEEM_PROCESS_TG = "VirtualTradeRedeemProcess";
  


  public static final String PROCESS_OrderCancelProcess = "OrderCancelProcess";
  


  public static final String PROCESS_RedeemCancelProcess = "RedeemCancelProcess";
  


  public static final String PROCESS_TCOrderRefundProcess = "TCOrderRefundProcess";
  


  public static final String PROCESS_TCRedeemRefundProcess = "TCRedeemRefundProcess";
  


  public static final String SEQ_KEY_SALE_ORDER = "XS";
  


  public static final String SEQ_KEY_REFUND_ORDER = "TH";
  


  public static final String SEQ_KEY_SALES_ADJUST = "TZ";
  


  public static final String SEQ_KEY_GIFT_CARD = "LP";
  


  public static final String SEQ_KEY_DELIVERY = "CK";
  


  public static final String SEQ_KEY_FOROIL = "OL";
  


  public static final String SEQ_KEY_OAU_ORDER_CANCEL = "DS";
  


  public static final String SEQ_KEY_PRODUCT = "SP";
  


  public static final String SEQ_KEY_PRODUCT_CATEGORY_CODE = "FL";
  


  public static final String SEQ_KEY_INJECT_BATCHNO = "BTN";
  


  public static final String SEQ_KEY_SPECIAL_SALE_ORDER = "TXS";
  


  public static final String SEQ_KEY_PURCHASE_ORDER = "TCQ";
  


  public static final String TICKET_CARD_ACTIVATE_ORDER_SEQ_KEY = "CA";
  


  public static final String SEQ_KEY_INVOICE_ORDER = "KP";
  


  public static final String SEQ_KEY_OAU_HF = "HF";
  


  public static final String SEQ_KEY_OAU_YK = "YK";
  


  public static final String SEQ_KEY_OAU_ZB = "ZB";
  


  public static final String SEQ_KEY_OAU_FS = "FS";
  


  public static final String SEQ_KEY_OAU_XS = "XS";
  


  public static final String SEQ_KEY_OAU_CS = "CS";
  


  public static final String SEQ_KEY_OAU_PS = "PS";
  


  public static final String SEQ_KEY_OAU_TPS = "TPS";
  


  public static final String SEQ_KEY_UNPAID_ORDER = "UH";
  


  public static final String INVOICE_SHEET_TYPE_ORDER = "1";
  


  public static final String INVOICE_ORDER_TYPE_OAU_REAL = "5";
  


  public static final String INVOICE_ORDER_TYPE_OAU_CARD = "6";
  


  public static final String INVOICE_TYPE_GENERAL_TAX = "3";
  


  public static final String INVOICE_TYPE_VAT_SPECIAL = "1";
  


  public static final String INVOICE_TYPE_VAT = "2";
  


  public static final String INVOICE_TYPE_NO = "0";
  


  public static final String VAT_INVOICE_APPLY_ADD = "addVatInvoiceOrdApply";
  


  public static final String VAT_INVOICE_APPLY_UPDATE = "updateVatInvoiceOrdApply";
  


  public static final String VAT_INVOICE_APPLY_SHOW = "showVatInvoiceOrdApply";
  


  public static final String PRODUCT_SOURCE_PURCHASE = "1";
  


  public static final String PRODUCT_SOURCE_INVENTORY = "2";
  


  public static final int ITEM_PRODUCT_TYPE_CARD = 1;
  


  public static final int ITEM_PRODUCT_TYPE_TICKET = 2;
  


  public static final int ITEM_PRODUCT_TYPE_POINT = 3;
  


  public static final int ITEM_PRODUCT_PHONE_COST = 4;
  


  public static final int ITEM_PRODUCT_IN_KIND = 5;
  


  public static final int ITEM_PRODUCT_GIFT_CARD = 6;
  


  public static final String DELIVERY_CODE_SEQ_KEY = "CK";
  


  public static final String OPPORTUNITY_STATUS_YES = "1";
  


  public static int ATTACHMENT_TYPE_ADD_POINT = 1;
  



  public static int ATTACHMENT_TYPE_SIGNATURE = 2;
  



  public static int ATTACHMENT_TYPE_MAIL = 3;
  



  public static int ATTACHMENT_TYPE_SIEBEL_TICKET = 4;
  



  public static int ATTACHMENT_TYPE_SIEBEL_CARD = 5;
  



  public static int ATTACHMENT_TYPE_ADD_POINT_RESULT = 6;
  



  public static int ATTACHMENT_TYPE_ADD_POINT_FAILURE = 7;
  



  public static int ATTACHMENT_TYPE_ADD_POINT_INVALID_CERTIFICATE = 8;
  



  public static int ATTACHMENT_TYPE_OTHER = 100;
  




  public static int ATTACHMENT_VALIDATE_STATUS_NOT_START = 0;
  



  public static int ATTACHMENT_VALIDATE_STATUS_ING = 1;
  



  public static int ATTACHMENT_VALIDATE_STATUS_SUCCESS = 2;
  



  public static int ATTACHMENT_VALIDATE_STATUS_NO_PASS = 4;
  

  public static final String CREATE_TC_VALID_FLAG = "valid";
  

  public static final String CREATE_TC_FACE_VALUE_HAVE = "have";
  

  public static final String CREATE_TC_FACE_VALUE_NO_HAVE = "no";
  

  public static final String CREATE_TC_RETURN_MAP_KEY_CARDINFOLIST = "cardInfoList";
  

  public static final String CREATE_TC_RETURN_MAP_KEY_TICKETINFOLIST = "ticketInfoList";
  

  public static final String CREATE_TC_RETURN_MAP_KEY_CARDBATCHINFOLIST = "cardBatchInfoList";
  

  public static final String CREATE_TC_RETURN_MAP_KEY_TICKETBATCHINFOLIST = "ticketBatchInfoList";
  

  public static final String CREATE_TC_RETURN_MAP_KEY_ATTACHMENTFILE = "attachmentFile";
  

  public static final String CREATE_TC_RETURN_MAP_KEY_CARDBATCHINFO = "cardBatchInfo";
  

  public static final String CREATE_TC_RETURN_MAP_KEY_ATTACHMENT_IDS = "attachmentIdList";
  

  public static final String CREATE_TC_RETURN_MAP_KEY_ATTACHMENT_ID = "attachmentId";
  

  public static final String SYSTEM_PARAM_CACHE_KEY = "systemParamCache";
  
  public static final Integer COMMIT_BATCH_NUM = Integer.valueOf(1000);
  


  public static final String SALES_ORDER_BILLING_SIGN_SOON = "1";
  


  public static final String SALES_ORDER_BILLING_SIGN_WAIT = "2";
  


  public static final int columnStrLength = 1000;
  


  public static final String GIFT_CARD_GIFT_CATEGORY_INNER = "1";
  


  public static final String GIFT_CARD_GIFT_CATEGORY = "2";
  


  public static final String SALES_ORDER_VIRTUAL_STATUS_YES = "1";
  


  public static final String SALES_ORDER_VIRTUAL_STATUS_NO = "2";
  


  public static final String GIFT_CATEGORY_INTEGRAL = "1";
  


  public static final String GIFT_CATEGORY_OAU = "2";
  


  public static final String APPROVAL_STATUS_NO_COMMIT = "1";
  


  public static final String APPROVAL_STATUS_COMMIT = "2";
  


  public static final String APPROVAL_STATUS_PASS = "3";
  


  public static final String APPROVAL_STATUS_NO_PASS = "4";
  


  public static final String APPROVAL_STATUS_COMPLETE = "5";
  


  public static final String BILLING_SIGN_NOT = "0";
  

  public static final String BILLING_SIGN_NOW = "1";
  

  public static final String BILLING_SIGN_WAIT = "2";
  

  public static final String NOTICE_BILLING_STATUS_NO = "1";
  

  public static final String NOTICE_BILLING_STATUS_YES = "2";
  

  public static final String CANCEL_SHEET_TYPE_CS = "CS";
  

  public static final String CANCEL_SHEET_TYPE_RC = "RC";
  

  public static final Integer TC_REFUND_TYPE_TICKET = Integer.valueOf(2);
  public static final Integer TC_REFUND_TYPE_CARD = Integer.valueOf(1);
  





  public static final Integer SHEET_PROCESS_JOB_PROCESS_TYPE_TP = Integer.valueOf(1);
  



  public static final Integer SHEET_PROCESS_JOB_PROCESS_TYPE_TC = Integer.valueOf(2);
  



  public static final Integer SHEET_PROCESS_JOB_PROCESS_TYPE_SIEBEL_RESULT = Integer.valueOf(3);
  



  public static final Integer SHEET_PROCESS_JOB_PROCESS_STATUS_NO = Integer.valueOf(0);
  



  public static final Integer SHEET_PROCESS_JOB_PROCESS_STATUS_DOING = Integer.valueOf(1);
  



  public static final Integer SHEET_PROCESS_JOB_PROCESS_STATUS_FINISH = Integer.valueOf(2);
  



  public static final Integer SHEET_PROCESS_JOB_PROCESS_STATUS_EXCEPTION = Integer.valueOf(-1);
  


  public static final String COST_ITEM_CODE = "COST_ITEM_CODE";
  


  public static final String COST_SUB_ITEM_CODE = "COST_SUB_ITEM_CODE";
  

  public static final Integer SHEET_BATCH_CALCULATE_STATUS_NO_START = Integer.valueOf(0);
  



  public static final Integer SHEET_BATCH_CALCULATE_STATUS_ING = Integer.valueOf(1);
  



  public static final Integer SHEET_BATCH_CALCULATE_STATUS_FINISH = Integer.valueOf(2);
  



  public static final Integer SHEET_BATCH_CALCULATE_STATUS_ERROR = Integer.valueOf(3);
  





  public static final Integer TASK_STATUS_APPROVALING = Integer.valueOf(1);
  



  public static final Integer TASK_STATUS_ATTACHMENT_VALIDATING = Integer.valueOf(5);
  



  public static final Integer ATTACHMENT_LARGEST_LINE_NUMBER = Integer.valueOf(5000);
  




  public static final String FIN_SALES_ATTACHMENT = "FIN_SALES_ATTACHMENT";
  




  public static final String BATCH_COMMIT_NUMBER = "BATCH_COMMIT_NUMBER";
  




  public static final String JOB_MAX_RETRY = "JOB_MAX_RETRY";
  




  public static final String TC_CREATE_VALID_FILE_LENGTH = "TC_CREATE_VALID_FILE_LENGTH";
  




  public static final String FIN_INDEX_URL = "FIN_INDEX_URL";
  



  public static final String ATTACHMENT_MAX_LINE_NUMBER = "ATTACHMENT_MAX_LINE_NUMBER";
  



  public static final String FIN_ACTIVITI_URL = "FIN_ACTIVITI_URL";
  



  public static final String SET_OUT_DATA_AUTHORIZATION = "SET_OUT_DATA_AUTHORIZATION";
  



  public static final String TASK_CODE_CREATE_TICKET_CARD = "CreateTicketCard";
  



  public static final String TASK_CODE_CREATE_APP_POINT = "SiebelAddPoint";
  



  public static final String TASK_CODE_ADJUST_FAILED_RECORD = "AdjustFailedRecord";
  



  public static final Integer ADD_POINT_RECORD_NO_START = Integer.valueOf(0);
  



  public static final Integer ADD_POINT_RECORD_SUCCESS = Integer.valueOf(1);
  



  public static final Integer ADD_POINT_RECORD_FAIL = Integer.valueOf(2);
  





  public static final Integer ADD_POINT_RECORD_SALES_CHOICE_NON = Integer.valueOf(0);
  



  public static final Integer ADD_POINT_RECORD_SALES_CHOICE_AGAIN = Integer.valueOf(1);
  



  public static final Integer ADD_POINT_RECORD_SALES_CHOICE_GIVE_UP = Integer.valueOf(2);
  



  public static final Integer INTEGRAL_SCALE = Integer.valueOf(500);
  public static final String ATTACHMENT_TYPE_PRODUCT = "7";
  public static final String ATTACHMENT_TYPE_QUOTED = "2";
  public static final String RECEIPT_STATUS_WAITIN = "1";
  public static final String RECEIPT_STATUS = "2";
  public static final String TEMPLATE_FOLDER = "template";
  public static final String SUPPLIER_STATUS_NORMAL = "1";
  public static final String SUPPLIER_STATUS_LIMIT = "2";
  public static final String PRODUCT_STATUS_PENDING_CHECK = "1";
  public static final String PRODUCT_STATUS_CHECK = "2";
  public static final String PRODUCT_STATUS_CANCEL = "3";
  public static final String TASK_CODE_INVOICE = "Invoice";
  public static final String ORDER_INVOICE_RETURN_MONEY = "returnMoney";
  public static final String ORDER_ALL_INVOICE_INFO_LIST = "allInvoiceList";
  public static final String ORDER_SALE_POINT = "ORDER_SALE_POINT";
  public static final String RECEIPT_STATUS_NO = "1";
  public static final String RECEIPT_STATUS_OK = "2";
  public static final String BIDDING_STATUS_BIDDING = "1";
  public static final String BIDDING_STATUS_EVALUATION = "2";
  public static final String BIDDING_STATUS_APPROVAL = "3";
  public static final String BIDDING_STATUS_BIDS = "4";
  public static final String BIDDING_STATUS_APPROVED = "5";
  public static final String BIDDING_STATUS_CANCEL = "6";
  public static final String BIDDING_STATUS_BIDING = "7";
  public static final String BID_STATUS_UNAPPROVAL = "1";
  public static final String BID_STATUS_APPROVAL = "2";
  public static final String BID_STATUS_APPROVAL_PASS = "3";
  public static final String BID_STATUS_APPROVAL_NOT_PASS = "4";
  public static final String BID_STATUS_CANCEL = "5";
  public static final String SUPPLIER_PRICE_BID_STATUS_YES = "2";
  public static final String SUPPLIER_PRICE_BID_STATUS_NO = "3";
  public static final String QUOTED_RESULT_YES = "1";
  public static final String QUOTED_RESULT_NO = "2";
  public static final String GIFT_STATUS_NO_SUBMIT = "1";
  public static final String GIFT_STATUS_SUBMIT = "2";
  public static final String GIFT_STATUS_REVIEW = "3";
  public static final String GIFT_STATUS_APPROVAL_PASS = "4";
  public static final String GIFT_STATUS_APPROVAL_NO_PASS = "5";
  public static final String GIFT_STATUS_COMPLETE = "6";
  public static final String GIFT_STATUS_SUSPEND = "-1";
  public static final String GIFT_STATUS_CANCEL = "-2";
  public static final String FOROIL_STATUS_NO_SUBMIT = "1";
  public static final String FOROIL_STATUS_SUBMIT = "2";
  public static final String OAU_ORDER_FILE_STATUS = "0";
  public static final String OAU_ORDER_FILE_STATUS_ARCHIVED = "1";
  public static final String FOROIL_STATUS_APPROVAL_PASS = "3";
  public static final String FOROIL_STATUS_APPROVAL_NO_PASS = "4";
  public static final String FOROIL_STATUS_RECHARGE = "5";
  public static final String FOROIL_STATUS_COMPLETE = "6";
  public static final String FOROIL_STATUS_SUSPEND = "-1";
  public static final String FOROIL_STATUS_CANCEL = "-2";
  public static final String CARD_CANCEL_STATUS_NO_SUBMIT = "1";
  public static final String CARD_CANCEL_STATUS_SUBMIT = "2";
  public static final String CARD_CANCEL_STATUS_APPROVAL_PASS = "3";
  public static final String CARD_CANCEL_STATUS_APPROVAL_NO_PASS = "4";
  public static final String CARD_CANCEL_STATUS_COMPLETE = "5";
  public static final String CARD_CANCEL_STATUS_SUSPEND = "-1";
  public static final String CARD_CANCEL_STATUS_CANCEL = "-2";
  public static final String GIFT_POINTS_PAID_NEW_SHARE = "2";
  public static final String GIFT_POINTS_HAVE_BEEN_PAID = "3";
  public static final String GIFT_CARD_USE_FLAG_YES = "1";
  public static final String GIFT_CARD_USE_FLAG_NO = "0";
  public static final String GIFT_NOTICE_BILLING_STATUS_NO = "0";
  public static final String GIFT_NOTICE_BILLING_STATUS_YES = "1";
  public static final String GIFT_NOTICE_BILLING_STATUS_ING = "2";
  public static final String GIFT_NOTICE_BILLING_STATUS_COMPLETE = "3";
  public static final String GIFT_NOTICE_BILLING_STATUS_CANCEL = "4";
  public static final String GIFT_NOTICE_BILLING_STATUS_NOT_APPLICABLE = "-1";
  public static final String GIFT_NOTICE_BILLING_STATUS_SUSPEND = "-2";
  public static final String FOROIL_NOTICE_BILLING_STATUS_NO = "0";
  public static final String FOROIL_NOTICE_BILLING_STATUS_YES = "1";
  public static final String FOROIL_NOTICE_BILLING_STATUS_ING = "2";
  public static final String FOROIL_NOTICE_BILLING_STATUS_COMPLETE = "3";
  public static final String FOROIL_NOTICE_BILLING_STATUS_CANCEL = "4";
  public static final String FOROIL_NOTICE_BILLING_STATUS_NOT_APPLICABLE = "-1";
  public static final String FOROIL_NOTICE_BILLING_STATUS_SUSPEND = "-2";
  public static final String FOROIL_CATEGORY_INNER = "1";
  public static final String FOROIL_CATEGORY_OUTER = "2";
  public static final String VIRTUAL_STATUS_NO = "1";
  public static final String VIRTUAL_STATUS_OK = "2";
  public static final String ORDER_STATUS_NO_SUBMIT = "1";
  public static final String ORDER_STATUS_SUBMIT = "2";
  public static final String ORDER_STATUS_CONFIRM_SHIP = "3";
  public static final String ORDER_STATUS_APPROVAL_PASS = "4";
  public static final String ORDER_STATUS_APPROVAL_NO_PASS = "5";
  public static final String ORDER_STATUS_COMPLETE = "6";
  public static final String ORDER_STATUS_SUSPEND = "-1";
  public static final String ORDER_NOTICE_BILLING_STATUS_NO = "0";
  public static final String ORDER_NOTICE_BILLING_STATUS_YES = "1";
  public static final String ORDER_NOTICE_BILLING_STATUS_ING = "2";
  public static final String ORDER_NOTICE_BILLING_STATUS_COMPLETE = "3";
  public static final int INVOICE_FORM_STATUS_1 = 1;
  public static final int INVOICE_FORM_STATUS_2 = 2;
  public static final int INVOICE_FORM_STATUS_3 = 3;
  public static final String BID_PROCESS = "BidProcess";
  public static final String BID_CHANGE_PROCESS = "BidChangeProcess";
  public static final String TRADE_SELL_PROCESS = "TradeSellProcess";
  public static final String REVERSE_TRADE_SELL_PROCESS = "ReverseTradeSellProcess";
  public static final String GIFT_CARD_SELL_PROCESS = "GiftCardSellProcess";
  public static final String RECHARGE_SELL_PROCESS = "RechargeSellProcess";
  public static final String GIFT_CARD_REFUND_PROCESS = "GiftCardRefundProcess";
  public static final String GIFT_CARD_CANCEL_PROCESS = "GiftCardCancelProcess";
  public static final String RECHARGE_CANCEL_PROCESS = "RechargeCancelProcess";
  public static final String OAU_CARD_CANCEL_SHEETTYPE_CANCEL = "CO";
  public static final String OAU_CARD_CANCEL_SHEETTYPE_REFUND = "CR";
  public static final String INVOICE_CANCEL_PROCESS = "InvoiceCancelProcess";
  public static final String PARTNER_CODE_JRKJ = "JRKJ";
  public static final String SEQ_KEY_CONTRACT = "HT";
  public static final String INVOICE_TYPE_VTS = "VTS";
  public static final String INVOICE_TYPE_VTO = "VTO";
  public static final String INVOICE_TYPE_BST = "BST";
  public static final String SALES_MANAGER_ROLES = "SALES_MANAGER_ROLES";
  public static final int INVOICE_LOG_OPER_TYPE_UPDATE = 9;
  public static final int REDEEM_STATUS_FINISH = 4;
  public static final int REDEEM_STATUS_STOP = -1;
  public static final int REDEEM_STATUS_CANCEL = -2;
  public static final String UNPAID_HANDLE_STATUS_NO = "1";
  public static final String UNPAID_HANDLE_STATUS_SECT = "2";
  public static final String UNPAID_HANDLE_STATUS_OVER = "3";
  public static final String UNPAID_TREATMENT_STATUS_BUYER = "1";
  public static final String UNPAID_TREATMENT_STATUS_MONEY = "2";
  public static final String BS_TAX_INDUSTRY_DEFALUT = "服务业";
  public static final String BUSINESS_INVOICE_CONTENT_KEY = "BUSINESS_INVOICE_CONTENT";
  public static final String PURCHASE_ATTACHMENT_KEY = "PURCHASE_ATTACHMENT";
  public static final String SALES_DELIVERY_EXPORT_TEMPLATE = "SALES_DELIVERY_EXPORT_TEMPLATE";
  public static final String COST_DISACCOUNT_FOROIL_RATE = "COST_DISACCOUNT_FOROIL_RATE";
  public static final String ORDER_TYPE_IA = "IA";
  public static final String ORDER_TYPE_CA = "CA";
  public static final String ORDER_TYPE_RC = "RC";
  public static final String ORDER_TYPE_RS = "RS";
  public static final String ORDER_TYPE_CC = "CC";
  public static final String ORDER_TYPE_CS = "CS";
  public static final String ORDER_TYPE_TG = "TG";
  public static final String ORDER_TYPE_TP = "TP";
  public static final String ORDER_TYPE_TC = "TC";
  public static final String ORDER_TYPE_SO = "SO";
  public static final String ORDER_TYPE_SI = "SI";
  public static final String ORDER_TYPE_OAU_ZB = "ZB";
  public static final String ORDER_TYPE_OAU_XS = "XS";
  public static final String ORDER_TYPE_OAU_FS = "FS";
  public static final String ORDER_TYPE_OAU_LP = "LP";
  public static final String ORDER_TYPE_OAU_HF = "HF";
  public static final String ORDER_TYPE_OAU_YK = "YK";
  public static final String ORDER_TYPE_OAU_CG = "CG";
  public static final String ORDER_TYPE_OAU_CO = "CO";
  public static final String ORDER_TYPE_OAU_CR = "CR";
  public static final String REFUND_ORDER_STATUS_CONFIRM_NO = "1";
  public static final String REFUND_ORDER_STATUS_CONFIRM = "2";
  public static final String JOB_TRIGGER_TYPE_SIMPLE = "S";
  public static final String JOB_TRIGGER_TYPE_CRON = "C";
  public static final String OAU_PURCHASE_TYPE = "1";
  public static final String OAU_PURCHASE_TYPE_NEGATIVE = "2";
  public static final int TRADE_TYPE_DEDUCTION_REVERSAL = -2;
  public static final int TRADE_TYPE_ADD = 1;
  public static final int TRADE_TYPE_DEDUCTION = 2;
  public static final String USER_UMID = "UMID";
  public static final String USER_ACTIVE_UMID = "ACTIVE_UMID";
  public static final String USER_ROLES = "ROLES";
  public static final String USER_TEMPID = "TEMPID";
  public static final String USER_SALES_CODE = "SALES_CODE";
  public static final int POINTS_ACCOUNT_DAILY_BALANCE_STATUS_NORMAL = 1;
  public static final int POINTS_ACCOUNT_DAILY_BALANCE_STATUS_ABNORMAL = -1;
  public static final String POINTS_ACCOUNT_DAILY_BALANCE_ABNORMAL = "PointsAccountDailyBalanceAbnormal";
  public static final String POINTS_ACCOUNT_DAILY_BALANCE_EXCEPTION = "PointsAccountDailyBalanceException";
  public static final int RECONCILIATION_JOB_INPUT_STATUS_NOT_START = 0;
  public static final int RECONCILIATION_JOB_INPUT_STATUS_NORMAL = 1;
  public static final int RECONCILIATION_JOB_INPUT_STATUS_ABNORMAL = -1;
  public static final String QUOTED_PRODUCT_SIGN_COPY = "2";
  public static final String SYSTEM_ACCOUNT_ADJUST = "PA";
  public static final String PAY_TYPE_CASH = "1";
  public static final String PAY_TYPE_NEW_BUY = "2";
  public static final String PAY_TYPE_HAVING = "3";
  public static final String WIN_RATE_ORDER = "1";
  public static final String WIN_RATE_LOSE_ORDER = "2";
  public static final String WIN_RATE_INQUIRY = "3";
  public static final String OPPORTUNITY_SUB_STATUS_NO_BID = "1";
  public static final String OPPORTUNITY_SUB_STATUS_HAS_BID = "2";
  public static final String OPPORTUNITY_STATUS_ENTRY = "1";
  public static final String OPPORTUNITY_STATUS_LOSE_ORDER = "2";
  public static final String OPPORTUNITY_STATUS_END = "3";
  public static final String REQUIREMENT_TYPE_NON_STATE_PURCHASE = "1";
  public static final String REQUIREMENT_TYPE_INTEGRAL_VOUCHERS = "2";
  public static final String REQUIREMENT_TYPE_INTEGRAL_POND = "3";
  public static final String REQUIREMENT_TYPE_BACKGROUND_NOTE_OF = "4";
  public static final String REQUIREMENT_TYPE_PHONE = "5";
  public static final String REQUIREMENT_TYPE_OIL_CARD = "6";
  public static final String REQUIREMENT_TYPE_GIFT_CARD = "7";
  public static final String SYSTEM_PARAM_EMAIL_PROJECT_URL = "EMAIL_PROJECT_URL";
  public static final String SYSTEM_PARAM_FINANCE_PROJECT_URL = "FINANCE_PROJECT_URL";
  public static final String VAT_INVOICE_CANCEL_STATE = "6";
  public static final String VAT_INVOICE_CANCEL_APPLY_STATE = "5";
  public static final String VAT_INVOICE_CANCEL_APPLY_ING_STATE = "7";
  public static final String VAT_INVOICE_NOT_OPEN_INVOICE_STATE = "1";
  public static final String VAT_INVOICE_OPEN_INVOICE_ING_STATE = "0";
  public static final String VAT_INVOICE_OPEN_INVOICE_STATE = "2";
  public static final String FINANCE_ADMIN = "FINANCE_ADMIN";
  
  public CommonConstant() {}
}
