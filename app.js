// -- Initialization -----------------------------------------------------------

var  request = require('request'),
          cc = require('./config/common').couch

var auth = cc.user + ':' + cc.password + '@'; // not needed atm beause we are having an admin party
var couchUrl = 'http://' + cc.host + ':' + cc.port + '/'; 

// -- Private Functions --------------------------------------------------------

/*
 *   _couchGet
 *   db: the database to use
 *   id: the id of the object in the database
 *   cb: callback, function (error, data)
 *   saveRev: set to TRUE if you need the _rev or _id
 *
 *   This function gets an object from the databased based on its id
 */

function _couchGet(db, id, cb, saveRev) {
  var url = couchUrl + db + '/'+ id;
  request(url, function (error, response, body) {
    if (error) return cb(error);
    var json = JSON.parse(body);
    if (json.error) return cb(json.error + ':' + json.reason);
    if (!saveRev) {
      delete json._id;
      delete json._rev;
    }
    cb(null, json);
  });
}

/*
 *   _couchSave
 *   db: the database to use
 *   obj: the object to be saved to the database
 *   cb: callback, function (error, data)
 *
 *   This function saves an object to the database and returns the id
 *   assigned to it upon creation
 */

function _couchSave(db, obj, cb) {
  var id = obj._id;
  var url = couchUrl + db;
  if (id) url += '/' + id;
  request({
    method: id ? 'PUT' : 'POST',
    url: url,
    json: obj
  }, function (error, response, json) {
    if (error) return cb(error);
    if (json.error) return cb(json.error + ':' + json.reason);
    return cb(null, json.id)
  })
}

// -- Implementation  ----------------------------------------------------------

/*
 *   The following are examples of how to implement the private functions
 *
 */


 var obj = [
  {"coid":46144,"number":"ACCT 2020","title":"Managerial Accounting Principles","credits":"3","description":"Survey of uses of accounting information by managers for decision making, including planning, budgeting, and controlling operations. Emphasizes accumulation, analysis, and control of product and service costs.","restrictions":"ACCT 2010","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46147,"number":"ACCT 3310","title":"Strategic Cost Management","credits":"3","description":"Contemporary theory and applications in the accumulation, analysis, and interpretation of accounting information for internal decision-making and control.","restrictions":"Cumulative GPA of 3.0 or higher; grade of B or better in ACCT 2010 ; ACCT 2020 ; MIS 2100 ; successful completion of the accounting entrance exam (www.huntsman.usu.edu/acct/); admittance to a USU major; and completion of at least 40 credits.","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46146,"number":"ACCT 3120","title":"Intermediate Financial Accounting and Reporting II","credits":"3","description":"Study of accounting principles, theory, and practice relating to liabilities, equities, and other contemporary issues.","restrictions":"ACCT 3110 ; admittance to a USU major; cumulative GPA of 2.67 or higher; and completion of at least 40 credits.","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46145,"number":"ACCT 3110","title":"Intermediate Financial Accounting and Reporting I","credits":"3","description":"Study of accounting principles, theory, and practice relating to financial reporting of assets.","restrictions":"Cumulative GPA of 3.0 or higher; grade of B or better in ACCT 2010 ; ACCT 2020 ; MIS 2100 ; successful completion of the accounting entrance exam (www.huntsman.usu.edu/acct/); admittance to a USU major; and completion of at least 40 credits.","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46148,"number":"ACCT 3410","title":"Income Taxation I","credits":"3","description":"Emphasis on Federal income taxation of individuals. Introduction to tax research methods and taxation of corporations and partnerships.","restrictions":"Admittance to a USU major; cumulative GPA of 2.67 or higher; and completion of at least 40 credits.","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46149,"number":"ACCT 4300","title":"Accounting Internship","credits":"3","description":"Provides accounting internship experience in a career-related position approved by the School of Accountancy and the Cooperative Education Office.","restrictions":"Admittance to a USU major; cumulative GPA of 2.67 or higher; and completion of at least 40 credits.Pass/Fail only","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46143,"number":"ACCT 2010","title":"Financial Accounting Principles","credits":"3","description":"Survey of uses of accounting information by investors and creditors for decision making. Emphasis on basic accounting principles used to prepare, analyze, and interpret financial statements.","restrictions":"STAT 1040   or MATH 1030  or MATH 1050  (MATH 1050   or equivalent is required for Huntsman School of Business majors); and GPA of 2.5 or higher.","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46150,"number":"ACCT 6400","title":"Income Taxation II","credits":"3","description":"Federal income taxation of partnerships, corporations, S-corporations, estates and trusts, and gifts.","restrictions":"ACCT 3410","campus":"","offered":"Fall, Summer"},
  {"coid":46151,"number":"ACCT 4500","title":"Accounting Information Systems","credits":"3","description":"Theoretical concepts underlying the accounting system’s computerized support of business processes. Topics include accounting systems development, controls, security, and audit.","restrictions":"ACCT 3110 ; admittance to a USU major; cumulative GPA of 2.67 or higher; and completion of at least 40 credits.","campus":"","offered":"Fall, Spring"},
  {"coid":46152,"number":"ACCT 4510","title":"Auditing Principles and Techniques","credits":"3","description":"Fundamental principles and techniques of auditing and reporting of audits presented in the context of the audit logic sequence. Integrative applications emphasizing audits of organizational resources, processes, and systems. Also addresses ethics, legal environment, auditing standards, and fraud.","restrictions":"ACCT 3110 ; admittance to a USU major; cumulative GPA of 2.67 or higher; and completion of at least 40 credits.","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46153,"number":"ACCT 4700","title":"Seminar in Accounting","credits":"3","description":"Special topics in accounting, including workshops, readings, and pilot course offerings.","restrictions":"","campus":"","offered":"Summer"},
  {"coid":46154,"number":"ACCT 4900","title":"Independent Research and Readings","credits":"1-3","description":"Selected reading and research individually assigned, handled, and directed. Problems of mutual interest to students and the instructor are investigated and reported.","restrictions":"Permission of department; admittance to a USU major; cumulative GPA of 2.67 or higher; and completion of at least 40 credits.Repeatable for credit.","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46155,"number":"ACCT 4950","title":"Senior Honors Thesis/Project","credits":"3","description":"Creative project that will then be written up, and presented, as a Senior Thesis as required for an Honors Plan.","restrictions":"","campus":"","offered":"Spring"},
  {"coid":46156,"number":"ACCT 6010","title":"Financial and Managerial Accounting","credits":"3","description":"Introduction to financial and managerial accounting at the graduate level.","restrictions":"Admission to a Huntsman School of Business graduate program.","campus":"","offered":"Summer"},
  {"coid":46157,"number":"ACCT 6200","title":"Accounting for Complex and Multinational Businesses","credits":"3","description":"Study of accounting principles related to consolidations and multinational accounting.","restrictions":"ACCT 3120","campus":"","offered":"Fall, Spring"},
  {"coid":46158,"number":"ACCT 6250","title":"Accounting Concepts, Research, and  Cases","credits":"3","description":"Financial reporting concepts are examined and used to develop a general frame of reference to explain and predict appropriate accounting methodologies. Integration of practical research methodology with the resolution of financial reporting problems cases.","restrictions":"ACCT 3120","campus":"","offered":"Spring, Summer"},
  {"coid":46159,"number":"ACCT 6300","title":"Advanced Accounting Internship","credits":"3","description":"Provides accounting internship experience in a career-related position approved by the School of Accountancy and the Cooperative Education Office.Pass/Fail only","restrictions":"","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46160,"number":"ACCT 6310","title":"Cost Management Systems to Support World-Class Operations","credits":"3","description":"Examination of appropriate cost management systems and performance measures to support decision making in world-class business operations. Cases, projects, simulations, and field studies to reinforce concepts.","restrictions":"ACCT 3310 .","campus":"","offered":"Fall, Summer"},
  {"coid":46161,"number":"ACCT 6350","title":"Accounting for Management Decision Making","credits":"3","description":"Action-oriented case studies to demonstrate management accounting techniques to achieve profit goals and business strategies in a variety of organizations. International accounting and ethical issues are addressed.","restrictions":"ACCT 2010   and ACCT 2020 , or ACCT 6010 .","campus":"","offered":"Fall, Spring, Summer"},
  {"coid":46162,"number":"ACCT 6410","title":"Tax Research and Procedures","credits":"3","description":"Tax research methodology, tax policy, and tax practice. Topic areas include tax research techniques, tax planning and communication, regulation and professional responsibilities with an introduction to multi-jurisdictional and international taxation.","restrictions":"ACCT 3410  and concurrent or prior enrollment in ACCT 6400","campus":"","offered":"Spring, Summer"},
  {"coid":46163,"number":"ACCT 6420","title":"Taxation of Corporations and Shareholders","credits":"3","description":"Concepts and principles governing the taxation of corporations and shareholders including corporate formation, captial structure, distributions, liquidations, reorganizations, consolidated tax returns and taxation of international transactions.","restrictions":"ACCT 3410   and ACCT 6400","campus":"","offered":"Summer"},
  {"coid":46164,"number":"ACCT 6440","title":"Taxation of Flow-Through Entities","credits":"3","description":"Advanced concepts and principles governing the taxation of partnerships and partners, s-corporations and shareholders with basic concepts in estates, trusts, and beneficiary taxation.","restrictions":"ACCT 3410   and ACCT 6400","campus":"","offered":"Fall"},
  {"coid":46165,"number":"ACCT 6460","title":"Advanced Tax Topics","credits":"3","description":"Concepts and principles of transfer taxes, not-for-profit organizations, multinational taxation of individuals, and other tax topics.","restrictions":"ACCT 3410   and ACCT 6400","campus":"","offered":"Summer"},
  {"coid":46167,"number":"ACCT 6510","title":"Financial Auditing","credits":"3","description":"Application of generally accepted auditing standards to accounting systems. Some study of auditing theory and current issues, and an introduction to statistical auditing.","restrictions":"ACCT 4510 .","campus":"","offered":"Fall, Spring"},
  {"coid":46168,"number":"ACCT 6540","title":"Fraud Examination and Forensic Accounting","credits":"3","description":"Study of forensic accounting. Topics covered include types of fraud, recognition of red flags, and fraud investigation techniques. Also includes practice with computer-aided fraud detection, interrogation techniques, and case studies.","restrictions":"","campus":"","offered":"Fall"},
  {"coid":46169,"number":"ACCT 6600","title":"Information Systems Auditing and Control","credits":"3","description":"Study of information systems auditing methodologies, including risk assessment, systems controls, and the use of computer-assisted audit techniques.","restrictions":"","campus":"","offered":"Fall"},
  {"coid":46166,"number":"ACCT 6500","title":"Advanced Accounting Information Systems","credits":"3","description":"Study of contemporary issues in accounting information systems, including emerging information technologies for supporting enterprise decision making.","restrictions":"ACCT 4500 .","campus":"","offered":"Spring"},
  {"coid":46170,"number":"ACCT 6620","title":"Financial Statement Analysis and Valuation","credits":"3","description":"Students learn to analyze financial data, translate that information into forecasts of financial statements, and use valuation models to arrive at a fundamental values for a business. Includes discussions of trading strategies, market efficiency, and other issues in capital markets.","restrictions":"ACCT 3120","campus":"","offered":"Fall"},
  {"coid":46171,"number":"ACCT 6700","title":"Advanced Accounting Topics","credits":"3","description":"Special topics include governmental accounting, international accounting, professional responsibilities, ethics, etiquette, and selected emerging and important financial reporting topics.","restrictions":"ACCT 3120","campus":"","offered":"Fall, Summer"},
  {"coid":46172,"number":"ACCT 6800","title":"Accounting Communications and Professional Conduct","credits":"3","description":"Study of written and oral communication skills appropriate for the accounting profession. Covers interpersonal skills and professional conduct, including ethical conduct, in various business settings.","restrictions":"","campus":"","offered":"Spring"},
  {"coid":46173,"number":"ACCT 6900","title":"Independent Reading and Research","credits":"1-3","description":"Independent work in accounting areas: theory, auditing, taxation, and other related areas.","restrictions":"Permission of department.Repeatable for credit.","campus":"","offered":"Fall, Spring, Summer"}
];


_couchGet('albums', '6e1295ed6c29495e54cc05947f18c8af', function (error, data) {
  if (error) throw error;
  console.log(data);
}, true);


/* 
 * - If no _id is present, a POST request is made, meaning a new item is created
 * - If an _id IS present, a PUT request is made, meaning an item is updated.
 * - Along with an _id, the _rev is also required. Without it, couchdb will return
 *   a confilct error. 
 */

obj.forEach(function (el, i) {
  _couchSave('courses', el, function (error, data) {
    if (error) throw error;
  });
})













