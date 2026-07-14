const MODULES = {
    MULT1: {
        table: "multi_payments",
        tempTable: "temp_multi_payments",
        expectedColumns: 33,
        dateColumns: [8, 9, 10, 11, 12, 13, 14, 22, 31],
        headers: [
            "ACCOUNT_GROUP",
            "ACC_TASK_ID",
            "CLAIM_ID",
            "MEMBER_ID",
            "NAME_AS_PER_CLAIM",
            "NAME_AS_PER_MEMBER_MASTER",
            "FATHER_NAME",
            "GENDER",
            "DOB",
            "DOJ_EPF",
            "DOJ_EPS",
            "DOJ_EPF71",
            "DOE_EPF",
            "DOE_EPS",
            "DOE_EPF71",
            "FORM_TYPE",
            "PARA_CODE",
            "SUB_PARA_CODE",
            "CREATED_ON",
            "APPROVED_ON",
            "SUB_PARA_CATEGORY",
            "PAYMENT_MODE",
            "DISPATCH_DATE",
            "TOTAL_AMOUNT",
            "NO_TIMES",
            "ACCOUNT_NO",
            "IFSC_CODE",
            "BANK_DETAILS",
            "CASE_STATUS",
            "CREATED_BY",
            "APPROVED_BY",
            "TO_CHAR(SYSDATE,'DD/MM/YYYY')",
            "LCM"
        ]
    },

    MULT10: {
        table: "multi_payments10",
        tempTable: "temp_multi_payments10",
        expectedColumns: 33,
        dateColumns: [8, 9, 10, 11, 12, 13, 14, 22, 31],
        headers: [
            "ACCOUNT_GROUP",
            "ACC_TASK_ID",
            "CLAIM_ID",
            "MEMBER_ID",
            "NAME_AS_PER_CLAIM",
            "NAME_AS_PER_MEMBER_MASTER",
            "FATHER_NAME",
            "GENDER",
            "DOB",
            "DOJ_EPF",
            "DOJ_EPS",
            "DOJ_EPF71",
            "DOE_EPF",
            "DOE_EPS",
            "DOE_EPF71",
            "FORM_TYPE",
            "PARA_CODE",
            "SUB_PARA_CODE",
            "CREATED_ON",
            "APPROVED_ON",
            "SUB_PARA_CATEGORY",
            "PAYMENT_MODE",
            "DISPATCH_DATE",
            "TOTAL_AMOUNT",
            "NO_TIMES",
            "ACCOUNT_NO",
            "IFSC_CODE",
            "BANK_DETAILS",
            "CASE_STATUS",
            "CREATED_BY",
            "APPROVED_BY",
            "TO_CHAR(SYSDATE,'DD/MM/YYYY')",
            "LCM"
        ]
    },

    DOB: {
        table: "dob_module",
        tempTable: "temp_dob_module"
    },

    TOP50: {
        table: "top50",
        tempTable: "temp_top50"
    },

    PPO: {
        table: "ppo",
        tempTable: "temp_ppo"
    },

    EDLI: {
        table: "edli",
        tempTable: "temp_edli"
    },

    "68J-A": {
        table: "68j_a",
        tempTable: "temp_68j_a"
    },

    "ZERO-OB": {
        table: "zero_ob",
        tempTable: "temp_zero_ob"
    },

    "COVID-A": {
        table: "covid_a",
        tempTable: "temp_covid_a"
    },

    "APX-E-1": {
        table: "appendix",
        tempTable: "temp_appendix"
    },

    "APX-E-10": {
        table: "appendix",
        tempTable: "temp_appendix"
    },

    "APX-E-21": {
        table: "appendix",
        tempTable: "temp_appendix"
    },

    "CLOSED-EST-1": {
        table: "closed_est",
        tempTable: "temp_closed_est"
    },

    "CLOSED-EST-10": {
        table: "closed_est",
        tempTable: "temp_closed_est"
    },

    "CLOSED-EST-21": {
        table: "closed_est",
        tempTable: "temp_closed_est"
    }
};

module.exports = MODULES;