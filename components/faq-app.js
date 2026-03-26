'use strict';

const FAQContext = React.createContext({
  faqs: [],
  setFAQs: () => {}
});

function FAQApp() {
  const [faqs, setFAQs] = React.useState(faqData);

  return (
    <FAQContext.Provider value={{ faqs, setFAQs }}>
      <FAQHeader />
      <FAQSection />
    </FAQContext.Provider>
  );
}

function FAQHeader() {
  const [query, setQuery] = React.useState('');

  const { setFAQs } = React.useContext(FAQContext);

  React.useEffect(() => {
    const result = faqData.filter(faqCategory => {
      const _questions = faqCategory.name
        .toLowerCase()
        .includes(query.toLowerCase())
        ? faqCategory.questions
        : faqCategory.questions.filter(question =>
            question.question.toLowerCase().includes(query.toLowerCase())
          );
      return !!_questions.length;
    });

    setFAQs(result);
  }, [query]);

  return (
    <section className="faqs-page-header">
      <h3>Frequently Asked Questions</h3>
      <div className="search">
        <input
          type="text"
          placeholder="Search for a question…"
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27px"
          height="27px"
          viewBox="0 0 27 27"
          version="1.1"
        >
          <defs />
          <g id="Designs" transform="translate(-935.000000, -692.000000)">
            <g id="CoE-Results" transform="translate(0.000000, 174.000000)">
              <g id="Content" transform="translate(115.000000, 432.000000)">
                <g id="search" transform="translate(0.000000, 75.000000)">
                  <path
                    d="M831.481328,11.7871305 C825.322954,11.7871305 820.313293,16.7941906 820.313293,22.9493664 C820.313293,29.1045422 825.322954,34.1116023 831.481328,34.1116023 C833.363939,34.1116023 835.214642,33.6651129 836.778167,32.8040261 C836.903407,32.9546628 837.042265,33.0934482 837.192979,33.2186234 L840.383846,36.4078337 C841.186661,37.310716 842.423919,37.6946527 843.597185,37.4049727 C844.770451,37.1152928 845.686522,36.1996984 845.976352,35.0270415 C846.266182,33.8543845 845.882046,32.6177687 844.978695,31.8153709 L841.787828,28.6261607 C841.632393,28.4707512 841.461305,28.331814 841.277289,28.2115633 C842.138823,26.6488503 842.681271,24.8310005 842.681271,22.9174743 C842.681271,16.7622985 837.671609,11.7552384 831.513236,11.7552384 L831.481328,11.7871305 Z M831.481328,14.9763408 C835.916633,14.9763408 839.458495,18.5163642 839.458495,22.9493664 C839.458495,25.0542452 838.692687,26.9996634 837.352523,28.434808 L837.256797,28.5304844 C837.106082,28.6556595 836.967224,28.794445 836.841984,28.9450817 C835.438003,30.2207658 833.523482,30.9542841 831.449419,30.9542841 C827.014114,30.9542841 823.472251,27.4142608 823.472251,22.9812585 C823.472251,18.5482563 827.014114,15.0082329 831.449419,15.0082329 L831.481328,14.9763408 Z"
                    id="magnifying-icon"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </section>
  );
}

function FAQSection() {
  const { faqs } = React.useContext(FAQContext);
  return (
    <section className="faqs">
      {faqs.map(faqCategory => (
        <section key={faqCategory.name} className="faq-category">
          <h5>{faqCategory.name}</h5>
          <section className="questions">
            {faqCategory.questions.map(question => (
              <FAQQuestion key={question.question} question={question} />
            ))}
          </section>
        </section>
      ))}
    </section>
  );
}

function FAQQuestion(props) {
  const { question } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(o => !o);

  return (
    <div className="question">
      <div className="header" role="button" onClick={toggle}>
        <h6>{question.question}</h6>
        <FAQToggleButton
          open={isOpen}
          onClick={e => {
            e.stopPropagation();
            toggle();
          }}
        />
      </div>
      <section className={isOpen ? 'show' : undefined}>
        {question.answer}
      </section>
    </div>
  );
}

function FAQToggleButton(props) {
  const { open = false, onClick } = props;
  return (
    <button onClick={onClick}>
      {!open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 27 27"
        >
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="#020410"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
          >
            <path d="M13.6 1v25.2M1 13.6h25.2" />
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="2"
          viewBox="0 0 27 2"
        >
          <path
            fill="none"
            fill-rule="evenodd"
            stroke="#020410"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.2"
            d="M1 .6h25.2"
          />
        </svg>
      )}
    </button>
  );
}

const faqData = [
  {
    name: 'Pricing',
    questions: [
      {
        question: 'How much does it cost to integrate Quickteller Business ?',
        answer: (
          <p>
            <b>Free</b>, it is free to register and integrate with Quickteller
            Business. Kindly visit{' '}
            <a
              href="https://business.quickteller.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://business.quickteller.com
            </a>
          </p>
        )
      },
      {
        question: 'How much is the fee per transaction ?',
        answer: (
          <React.Fragment>
            <p>
              Fees per transaction are:
              <br />
              Local transactions - <b>1.5% Capped at 2000 (VAT inclusive)</b>
              <br />
              International Card transactions - <b>3.8% (VAT exclusive)</b>
            </p>
          </React.Fragment>
        )
      }
    ]
  },
  {
    name: 'Integration',
    questions: [
      {
        question: 'How can I integrate Quickteller Business to my website ?',
        answer: (
          <p>
            You can integrate Quickteller Business to your website using the
            Web, IOS and Android SDKs, Kindly visit our developer documentation
            for more information{' '}
            <a
              href="https://developer.interswitchgroup.com/docs/quickteller-business"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://docs.interswitchgroup.com/docs
            </a>
          </p>
        )
      },
      {
        question: 'How do I integrate Quickteller Business to My Website ?',
        answer: (
          <React.Fragment>
            <p>
              You can integrate Quickteller Business to your Website and Mobile
              App.
            </p>
            <p>
              Kindly visit{' '}
              <a
                href="https://developer.interswitchgroup.com/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://developer.interswitchgroup.com/docs
              </a>{' '}
            </p>
          </React.Fragment>
        )
      },
      {
        question:
          'Does Quickteller Business have plugins available for API integrations?',
        answer: (
          <React.Fragment>
            <p>
              Yes, Quickteller Business currently has WordPress and WooCommerce
              plugins available.
            </p>

            <p>
              Kindly visit{' '}
              <a
                href="https://docs.interswitchgroup.com/docs/plugins-overview"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://docs.interswitchgroup.com/docs/plugins-overview
              </a>{' '}
              to access these plugins
            </p>
          </React.Fragment>
        )
      }
    ]
  },
  // {
  //   name: 'Account',
  //   questions: [

  //   ]
  // },
  {
    name: 'Onboarding',
    questions: [
      {
        question:
          'What do I need to complete Quickteller Business Registration?',
        answer: (
          <React.Fragment>
            <p>
              To complete your Quickteller Business Registration, you need to
              provide valid copies of the required KYC Documents.
            </p>

            <p>The documents required depends on the type of business.</p>

            <p>For Individual / Starter businesses, you need the following</p>
            <ol>
              <li>Personal Information</li>
              <li>Business Information</li>
              <li>Passport Photograph or Selfie Identity </li>
              <li>Proof Of Address </li>
              <li>Settlement Accounts</li>
            </ol>

            <p>For Government Registered Business</p>
            <ol>
              <li>Contact Person Information </li>
              <li>Business Information</li>
              <li>KYC</li>
              <li>Settlement Accounts</li>
              <li>CAC documents</li>
              <li>SCUML (where applicable)</li>
              <li>Directors BVN</li>
              <li>Major shareholders' IDs</li>
            </ol>
          </React.Fragment>
        )
      },
      {
        question:
          "I don't have a Registered Business, Can I use Quickteller Business to receive payments for my business on Instagram ?",
        answer: (
          <React.Fragment>
            <p>
              Yes, you can use Quickteller Business to receive payments for your
              business on Instagram and other social platforms.
            </p>
            <p>
              You can use payment links and Invoice links on Quickteller
              Business by adding it to your bio on Instagram to accept payments
              from your customers.
            </p>
          </React.Fragment>
        )
      },
      {
        question:
          'I already have a quickteller.com account, do I need to sign up to use Quickteller Business?',
        answer: (
          <p>
            Yes, you need to sign up to Quickteller Business to use it. You
            cannot log in with your Quickteller.com account
          </p>
        )
      },
      {
        question:
          'What document(s) can be used as a valid means of Identification?',
        answer: (
          <React.Fragment>
            <p>
              The following types of document can be used as Identity documents
            </p>
            <ol>
              <li>Valid International Passport</li>
              <li>Valid Driver's License </li>
              <li>Valid National Identity Card </li>
              <li>Valid Residence Permit for foreign national </li>
              <li>Valid Permanent Voters Card (PVC) </li>
              <li>
                Confirmed identification document issued by government /
                parastatals i.e. Federal, state and local tiers of government{' '}
              </li>
              <li>Confirmed Military and Paramilitary identification cards </li>
              <li>Photo Electronic Tax clearance card. </li>
            </ol>
            <p>
              All files must be less than 10MB and must be in .jpg, .jpeg, .png
              and .pdf formats
            </p>
          </React.Fragment>
        )
      },
      {
        question: 'What document(s) can be used as a valid proof of address?',
        answer: (
          <React.Fragment>
            <p>
              Any of the documents listed below can be used as proof of address{' '}
            </p>
            <ol>
              <li>
                Recent utility bill or evidence of payment of Utility Bill
                issued in the last 3 months e.g. water rates, telephone bills,
                electricity bills, waste disposal bills etc.
              </li>
              <li>
                State/local government rates e.g. Tenement rate, Land Use Charge
                etc.
              </li>
              <li>Local authority tax bill valid for the current year</li>
              <li>
                Recent Bank statement containing current address and issued in
                the last 3 months{' '}
              </li>
              <li>Lease/tenancy agreement</li>
            </ol>
            <p>
              All files must be less than 10MB and must be in .jpg, .jpeg, .png
              and .pdf formats
            </p>
          </React.Fragment>
        )
      },
      {
        question:
          'My business is registered as a sole proprietorship. What are the documents required for my business class?',
        answer: (
          <React.Fragment>
            <p>
              For Sole Proprietorship Business, you need the following documents
              :
            </p>
            <ol>
              <li>Tax Identification Number</li>
              <li>Certificate of Registration of the business Name</li>
              <li>
                Certified True Copy of the Form CAC/BN/1 (Application for
                Registration of Business Name) to determine the registered Sole
                Proprietor(s);
              </li>
              <li>
                Valid primary identification documents - Valid International
                Passport; Drivers' License; National Identity Card; Permanent
                Voters Card (PVC)
              </li>
              <li>Proof of business operating address for the company</li>
              <li>
                Any other document or licenses required for your specific
                business (e.g. SCUML, betting license etc.)
              </li>
            </ol>
          </React.Fragment>
        )
      },
      {
        question:
          'My business is registered as a private limited liability company. What are the documents required for my business class?',
        answer: (
          <React.Fragment>
            <p>
              For Private Limited Liability Companies, you need the following
              documents:
            </p>
            <ol>
              <li>Tax Identification Number</li>
              <li>Certificate of Incorporation</li>
              <li>
                Memorandum and Articles of Association [certified as true copy
                by the Registrar of Companies]
              </li>
              <li>
                Form CAC 7 (formerly CO7 - Particulars of Directors) certified
                as a true copy by the Registrar of Companies
              </li>
              <li>
                Form CAC 2 (formerly CO2-statement of return on allotment of
                shares) certified as a true copy by the Registrar of Companies;
                or Form CAC 1.1 (Application for Registration of Company) for
                entities incorporated post the executive order for Ease of Doing
                Business approved in 2017 (replaces Form CAC 2 and CAC 7)
              </li>
              <li>Proof of business operating address for the company</li>
              <li>
                Primary Identification Documents of all Shareholders with 5%
                ownership and above
              </li>
              <li>
                Operating license (where applicable) e.g. Bureau De Change,
                Payment Solution Service Providers (PSSPs), Mobile Money
                Operators (MMO), International Money Transfer Operators (IMTOs)
              </li>
              <li>
                Any other document or licenses required for your specific
                business (e.g. SCUML, betting license etc.)
              </li>
            </ol>
          </React.Fragment>
        )
      },
      {
        question:
          'My business is registered as a public limited liability, What are the documents required for my business class?',
        answer: (
          <React.Fragment>
            <p>
              For Public Limited Liability companies, you need the following
              documents :
            </p>
            <ol>
              <li>Tax Identification Number</li>
              <li>Certificate of Incorporation;</li>
              <li>
                Memorandum and Articles of Association [certified as true copy
                by the Registrar of Companies]
              </li>
              <li>
                Form CAC 7 (formerly CO7 - Particulars of Directors) certified
                as a true copy by the Registrar of Companies
              </li>
              <li>Proof of business operating address for the company</li>
              <li>
                Primary Identification Documents of all Shareholders with 5%
                ownership and above
              </li>
              <li>
                Operating license (where applicable) e.g. Bureau De Change,
                Payment Solution Service Providers (PSSPs), Mobile Money
                Operators (MMO), International Money Transfer Operators (IMTOs)
              </li>
              <li>
                Any other document or licenses required for your specific
                business (e.g. SCUML, betting license etc.)
              </li>
            </ol>
          </React.Fragment>
        )
      },
      {
        question:
          'My organization is registered as NGOs, Charities and Religious Organizations. What are the documents required for my business class?',
        answer: (
          <React.Fragment>
            <p>
              For NGOs, Charities and Religious Organizations, you need the
              following KYC documents:
            </p>
            <ol>
              <li>Tax Identification Number</li>
              <li>
                Certificate of Registration / Incorporation of the Charity/NGO /
                Religious Organization
              </li>
              <li>
                Certified true copies of the Form CAC/IT 1 (Incorporated
                Trustees Application Form to include the constitution
              </li>
              <li>
                Resolution (or minutes of last meeting) authorizing the
                establishment of business relationship with Interswitch on the
                letter headed paper, duly signed by at least two Trustees and
                nominating signatories/authorizers
              </li>
              <li>Utility bill; and</li>
              <li>
                Valid primary means of identification (such Permanent Voters'
                Card, International Passport, Drivers' License and National ID
                card (NIMC)) of nominated authorizers and the registered
                Trustees that signed the resolution
              </li>
              <li>
                Any other document or licenses required for your specific
                business (e.g. SCUML, betting license etc.)
              </li>
            </ol>
          </React.Fragment>
        )
      },
      {
        question:
          'I have completed the onboarding requirement and clicked on Request-to-go-live button. What is the next thing to do?',
        answer: (
          <React.Fragment>
            <p>
              The next thing is to wait for our compliance team to review your
              documents and provide feedback. They would typically respond
              within 24 hours.
            </p>
            <p>
              Depending on whether your documents are valid, your request could
              be approved or declined.
            </p>
          </React.Fragment>
        )
      },
      {
        question:
          'Can I have more than one business account with different business names?',
        answer: (
          <p>
            No, you cannot have the same business name because business name
            must be unique for every business account
          </p>
        )
      },
      {
        question:
          'Can I have more than one business account with same merchant name?',
        answer: (
          <p>
            Yes, you can have more than 1 business (merchant account) with the
            same merchant name
          </p>
        )
      },
      {
        question: 'I do not have company registration documents. What do I do?',
        answer: (
          <p>
            You can register as a starter business or visit Home | Corporate
            Affairs Commission (
            <a
              href="https://www.cac.gov.ng"
              target="_blank"
              rel="noopener noreferrer"
            >
              cac.gov.ng
            </a>
            ) to commence the processing of your company registration documents.
          </p>
        )
      },
      {
        question: 'My address does not have a utility bill. What do I do?',
        answer: (
          <p>
            You can use any other document that shows your residential address
            such as your bank statement and lease/tenancy agreement, tax bill
            valid for the current year
          </p>
        )
      }
    ]
  },
  {
    name: 'Disputes and Refunds',
    questions: [
      {
        question: 'How does Quickteller Business handle Disputes?',
        answer: (
          <p>
            Disputes and chargebacks are managed by merchants. When your
            customer raises a dispute against your business, you can manage the
            dispute from the platform under the dispute management module.
          </p>
        )
      },
      {
        question: 'As a business, can I refund a customer?',
        answer: (
          <React.Fragment>
            <p>
              Yes, you can refund a customer by initiating a refund from the
              transaction details page.
            </p>
            <p>
              <b>Note:</b> Only successful transactions can be refunded.
            </p>
          </React.Fragment>
        )
      },
      {
        question: 'How do I initiate a refund?',
        answer: (
          <React.Fragment>
            <p>To initiate a refund,</p>
            <ol>
              <li>Log in to your Quickteller Business Account. </li>
              <li>
                Then click on transactions in the side menu option and select
                the specific transaction you want to initiate a refund on.
              </li>
              <li> Click on the refund button </li>
              <li>Provide the refund details</li>
            </ol>
            <p>
              <b>Note:</b> Only successful transactions can be refunded
            </p>
          </React.Fragment>
        )
      }
    ]
  },
  {
    name: 'Accepting Payments',
    questions: [
      {
        question: "I don't have a website. Can I use Quickteller Business?",
        answer: (
          <React.Fragment>
            <p>
              Yes, we cater for businesses who do not have websites. With
              Quickteller Business, you can use our Storefront and Payment tools
              like, Payment Links and Invoices.{' '}
            </p>
            <p>
              {' '}
              <b>Storefront</b> allows you to upload your wares online and
              generate a dedicated website address that can be shared with your
              customers. It comes enabled with checkout and online payment
              capabilities to allow you display your wares online and get paid
              for them without the cost of developing or hosting a website.
            </p>
            <p>
              With <b>Payment Links</b>, You can use it to sell Simple Physical
              and Digital Products, you can also use it to collect donations,
              subscription payments. All you have to do is to send a link that
              will present an online payment engine that people can use to pay
              you.
            </p>
            <p>
              With <b>Invoices</b>, you can issue an invoice to your clients and
              customers. Simply complete the invoice form and your invoice will
              be sent to your clients via emails, Your clients can make payments
              via their debit cards, QR, USSD and Verve Wallets.
            </p>
          </React.Fragment>
        )
      },
      {
        question:
          'I sell on Instagram, can I use Quickteller Business for my Business?',
        answer: (
          <React.Fragment>
            <p>
              Yes, you can. You can use our payment link and invoice link to
              sell your products.
            </p>
            <p>
              You can also set up a storefront and share the link on your
              Instagram bio. You get instant notifications when your customers
              make payments via the Storefront link
            </p>
          </React.Fragment>
        )
      },
      {
        question: 'Does Quickteller business have a mobile app?',
        answer: (
          <p>
            Yes, you can download that from android and Apple stores. Just
            search with the phrase <b>Quickteller Business</b>.
          </p>
        )
      },
      {
        question: 'Do you have an invoice feature?',
        answer: (
          <React.Fragment>
            <p>Yes, you can send invoices to your clients and customers.</p>
            <p>
              Log in to Quickteller Business and click on the invoices tab on
              the left menu pane
            </p>
            <p>You will find the New Invoice Button at the top right corner</p>
          </React.Fragment>
        )
      },
      {
        question:
          'I sell books. Do you have a payment link feature I can use to accept payments?',
        answer: (
          <React.Fragment>
            <p>
              Yes, we have a payment links feature. You can set it up as a
              Ssngle payment link or a recurring payment link
            </p>
            <p>
              Single Payment Links are used for one-time payment collection, it
              can be used to sell digital products, physical products and
              collect donations.
            </p>
            <p>
              Recurring Payment Links can be used for business who needs to
              collect payments from their customers periodically, for example
              Gym Business and loan companies.
            </p>
            <p>
              To create a recurring payment link, Businesses are required to
              create a subscription plan.
            </p>
            <p>
              Creating a Subscription Plan will enable businesses to set up the
              recurring schedule to charge Daily, Weekly, Monthly and Yearly
              depending on the plan and frequency.
            </p>
          </React.Fragment>
        )
      }
    ]
  },
  {
    name: 'Settlement',
    questions: [
      {
        question: 'What is your Settlement Process?',
        answer: (
          <p>
            All processed transactions are settled within the next 24 hours
            after the transaction is processed often called T+ 1 day
          </p>
        )
      },
      {
        question: 'Can I be settled same day?',
        answer: <p>All transactions are settled T+1 (next working day)</p>
      },
      {
        question: 'Can I be settled in dollar?',
        answer: <p>No, Settlement is done is Naira only.</p>
      }
    ]
  },
  {
    name: 'POS',
    questions: [
      {
        question: 'Can I get a POS ?',
        answer: (
          <p>
            Yes, you can get a POS by requesting via the POS menu on Quickteller
            Business if you fulfil the KYC requirements
          </p>
        )
      }
    ]
  },
  {
    name: 'Escrow',
    questions: [
      {
        question: 'How can I use the escrow service?',
        answer: (
          <p>
            You can use the escrow service to temporarily hold funds with an
            independent 3rd party until the transaction condition between you
            and your customer is met.
          </p>
        )
      }
    ]
  },
  {
    name: 'Referrals',
    questions: [
      {
        question: 'Can I get referral bonus on Quickteller Business?',
        answer: (
          <p>
            Yes, you get 5% of the transaction fees on the referred customer's
            transaction for every transaction done for the next 5 years
          </p>
        )
      }
    ]
  },
  {
    name: 'Account Management',
    questions: [
      {
        question: 'Do I have an account officer?',
        answer: (
          <p>
            Yes, you have an account officer alongside self- service options for
            support and enquiries
          </p>
        )
      }
    ]
  },
  {
    name: 'Transactions',
    questions: [
      {
        question: 'Can I receive payments in foreign currency?',
        answer: (
          <p>
            Yes, you can receive payments in foreign currency from your
            customers via Amex or Mastercard International cards, however, your
            account will be settled in naira
          </p>
        )
      },
      {
        question:
          'How long does it take to confirm a pending transaction on Quickteller Business?',
        answer: (
          <p>
            Transactions are confirmed instantly, however, if there are network
            issues, it can take between 30 mins to 1 hour to confirm a pending
            transaction.
          </p>
        )
      },
      {
        question: 'Can I get real time transaction notifications?',
        answer: <p>Yes, you get instant transaction notification</p>
      }
    ]
  }
];

const domContainer = document.querySelector('#faq-app');
const root = ReactDOM.createRoot(domContainer);
root.render(<FAQApp />);
