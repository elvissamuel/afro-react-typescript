import React from 'react'
import logo from '../assets/imgs/afrologo.png'

type Props = {}

const PrivacyPolicy = (props: Props) => {

  return (
    <div className=" flex items-center bg-gradient-to-r from-secondaryColor via-white to-white h-full justify-center px-6 py-2 lg:px-8">
      <div className='flex flex-col items-center md:w-[80%]'>
        <div className='w-[180px] h-[180px]'>
          <img src={logo} alt='afro-logo' className='object-contain w-full h-full' />
        </div>
        <div>
          <h2 className='text-center text-3xl font-semibold text-primaryColor mb-4'>Privacy Policy</h2>
          <h3 className='text-center md:text-left text-2xl font-semibold text-primaryColor mb-4'>General Terms of Use of the AfroMarketS quare Services for Buyers and Sellers /Vendors</h3>
          <div className='my-2'>
            <p className='font-semibold'>Introduction</p>
            <ul className='ml-6 list-disc'>
              <li>These general terms and conditions shall apply to buyers and sellers/ vendors and shall govern their use of AfroMarketSquare (hereinafter referred to as “Marketplace”, “Platform” and related services).</li>
              <li>By using our marketplace you accept these general terms and conditions in full. If you disagree with these general terms and conditions or any part of these general terms and conditions you must not use our marketplace.</li>
              <li>
                <span>If you use our marketplace in the course of a business or other organizational project then by so doing you:</span>
                <ul className='ml-6 list-disc'>
                  <li>Confirm that you have obtained the necessary authority to agree to these general terms and conditions;</li>
                  <li>bind both yourself and the person company or other legal entity that operates that business or organizational project to these general terms and conditions; and</li>
                  <li>agree that you in these general terms and conditions shall reference both the individual user and the relevant person company or legal entity unless the context requires otherwise.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Registration and account</p>
            <ul className='ml-6 list-disc'>
              <li>You may not register with our marketplace if you are under 18 years of age (by using our marketplace or agreeing to these general terms and conditions you warrant and represent to us that you are at least 18 years of age).</li>
              <li><span>If you register for an account with our marketplace you will be asked to provide an email address/user ID and password – and, the user (Vendor/Consumer) will be prompted to insert a phone number for the purpose of verification. You agree to:</span>
              <ul className='ml-6 list-disc'>
                <li>keep your password confidential</li>
                <li>Notify us in writing immediately at (insert link (customer care)) if you become aware of any disclosure of your password; and</li>
                <li>be responsible for any activity on our marketplace arising out of any failure to keep your password confidential and you may be held liable for any losses arising out of such a failure.</li>
                <li>Your account shall be used exclusively by you and you shall not transfer your account to any third party. If you authorize any third party to manage your account on your behalf this shall be at your own risk.</li>
                <li>We may suspend or cancel your account and/or edit your account details at any time in our sole discretion and without notice or explanation providing that if we cancel any products or services you have paid for but not received and you have not breached these General Terms and Conditions we will refund you in respect of the same.</li>
              </ul>
              </li>
              <li>You may cancel your account on our marketplace by contacting us at (insert link (customer care))</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Terms and conditions of sale</p>
            <ul className='ml-6 list-disc'>
              <li><span>You acknowledge and agree that:</span>
              <ul className='ml-6 list-disc'>
                <li>the marketplace provides an online location for sellers to sell and buyers to purchase products;</li>
                <li>we shall accept binding sales on behalf of sellers but (unless AfroMarketSquare is indicated as the seller) AfroMarketSquare is not a party to the transaction between the seller and the buyer; and</li>
                <li>a contract for the sale and purchase of a product or products will come into force between the buyer and seller and accordingly you commit to buying or selling the relevant product or products upon the buyer’s confirmation of purchase via the marketplace.</li>
                </ul>
                </li>
                <li><span>Subject to these general terms and conditions the seller’s terms of business shall govern the contract for sale and purchase between the buyer and the seller. Notwithstanding the foregoing, the following provisions will be incorporated into the contract of sale and purchase between the buyer and the seller:</span>
                <ul className='ml-6 list-disc'>
                  <li>the price for the product must include all taxes (if any) and comply with applicable laws in force from time to time;</li>
                  <li>delivery charges packaging charges handling charges administrative charges insurance costs other ancillary costs and charges where applicable will only be payable by the buyer if this is expressly stated in the product listing, and delivery of digital products may be made electronically;</li>
                  <li>products must be of satisfactory quality fit and safe for any purpose specified in and conform in all material respects to the product listing and any other description of the products supplied or made available by the seller to the buyer; and</li>
                  <li>in respect of physical products sold the seller warrants that the seller has good title to and is the sole legal and beneficial owner of the products and/or has the right to supply the products pursuant to this agreement and that the products are not subject to any third-party rights or restrictions including but not limited to any criminal insolvency or tax investigation or proceedings.</li>
                </ul>
                </li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Return and refund</p>
            <ul className='ml-6 list-disc'>
              <li>Visit the return and refund policy page ( insert link).</li>
            </ul>
          </div>

          <div>
            <p>Payments</p>
            <ul className='ml-6 list-disc'>
              <li><span>You must make payments due under these general terms and conditions in accordance with the following:</span>
              <ul className='ml-6 list-disc'>
                <li>Payment on delivery</li>
                <li>Debit & Credit card</li>
                <li>Bank transfer</li>
              </ul>
              <ul className='ml-6 list-disc'>
                <li><span>Payment on delivery</span>
                <p>You may make payments for your purchases from the AfroMarketSquare marketplace once the goods are delivered to you by providing the exact amount of the purchase price to the delivery agent in cash or by paying the exact amount via mobile transfer to the AfroMarketSquare payment details that will be provided to you by the delivery agent.</p>
                </li>
              </ul>
              <li><span>Debit & Credit Cards</span>
              <p>You may make payments for your purchases from the AfroMarketSquare marketplace by using your debit or credit card.
              You will be required to input your card details at the checkout process as a payment method.</p></li>
              <li><span>Bank Transfer</span>
              <p>You may make payments for your purchases from the AfroMarketSquare marketplace by bank transfer. You will be required to input your bank information at the checkout process.</p></li>
              </li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Promotions</p>
            <ul className='ml-6 list-disc'>
              <li>Promotions and competitions run by AfroMarketSquare and/or other promoters (third-party vendors) shall be managed in accordance with the rules accompanying the promotion.</li>
            </ul>
          </div>

          <div>
            <p className='font-semibold'>Rules about your content</p>
            <ul className='ml-6 list-disc'>
              <li><span>In these general terms and conditions your content means:</span>
              <ul className='ml-6 list-disc'>
                <li>all works and materials (including without limitation text graphics images audio material video material audio-visual material scripts software and files) that you submit to us or our marketplace for storage or publication processing by or onward transmission; and</li>
                <li>all communications on the marketplace including product reviews feedback and comments.</li>
                </ul></li>
                <li>Your content and the use of your content by us in accordance with these general terms and conditions must be accurate complete and truthful.</li>
                <li><span>Your content must be appropriate civil and tasteful and accord with generally accepted standards of etiquette and behaviour on the internet and must not:</span>
                <ul className='ml-6 list-disc'>
                  <li>be offensive obscene indecent pornographic lewd suggestive or sexually explicit;</li>
                  <li>depict violence in an explicit graphic or gratuitous manner; or</li>
                  <li>be blasphemous in breach of racial or religious hatred or discrimination legislation;</li>
                  <li>be deceptive fraudulent threatening abusive harassing anti-social menacing hateful discriminatory or inflammatory;</li>
                  <li>cause annoyance inconvenience or needless anxiety to any person; or</li>
                  <li>constitute spam.</li>
                </ul>
                </li>
                <li><span>Your content must not be illegal or unlawful infringe any person's legal rights or be capable of giving rise to legal action against any person (in each case in any jurisdiction and under any applicable law). Your content must not infringe or breach:</span>
                <ul className='ml-6 list-disc'>
                  <li>any copyright moral right database right trademark right design right right in passing off or other intellectual property rights;</li>
                  <li>any right of confidence right of privacy or right under data protection legislation;</li>
                  <li>any contractual obligation owed to any person; or any court order.</li>
                </ul>
                </li>
                <li>You must not use our marketplace to link to any website or web page consisting of or containing material that would where posted on our marketplace breach the provisions of these general terms and conditions.</li>
                <li>You must not submit to our marketplace any material that is or has ever been the subject of any threatened or actual legal proceedings or other similar complaint.</li>
                <li>The review function on the marketplace may be used to facilitate buyer reviews on products. You shall not use the review function or any other form of communication to provide inaccurate inauthentic or fake reviews.</li>
                <li><span>You must not interfere with a transaction by</span>
                <ul className='ml-6 list-disc'>
                  <li>contacting another user to buy or sell an item listed on the marketplace outside of the marketplace; or</li>
                  <li>communicating with a user involved in an active or completed transaction to warn them away from a particular buyer seller or item; or</li>
                  <li>contacting another user with the intent to collect any payments</li>
                </ul>
                </li>
                <li>You acknowledge that all users of the marketplace are solely responsible for interactions with other users and you shall exercise caution and good judgment in your communication with users. You shall not send them personal information including credit card details.</li>
                <li>We may periodically review your content and we reserve the right to remove any content at our discretion for any reason whatsoever.</li>
                <li>If you learn of any unlawful material or activity on our marketplace or any material or activity that breaches these general terms and conditions you may inform us by contacting us as provided in the section</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Our rights to use your content</p>
            <ul className='ml-6 list-disc'>
              <li>You grant us a worldwide irrevocable non-exclusive royalty-free license to use reproduce store adapt publish translate and distribute your content on our marketplace and across our marketing channels and any existing or future media.</li>
              <li>You grant us the right to sub-license the rights licensed under section</li>
              <li>You grant us the right to bring an action for infringement of the rights licensed under section 8.1</li>
              <li>You hereby waive all your moral rights in your content to the maximum extent permitted by applicable law, and you warrant and represent that all other moral rights in your content have been waived to the maximum extent permitted by applicable law.</li>
              <li>Without prejudice to our other rights under these general terms and conditions if you breach our rules on content in any way or if we reasonably suspect that you have breached our rules on content we may delete unpublish or edit any or all of your content.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Use of the website and mobile applications</p>
            <ul className='ml-6 list-disc'>
              <li>In this section words, such as “marketplace” and website” shall be used interchangeably to refer to AfroMarketSquare’s websites and mobile applications.</li>
              <li><span>You may:</span>
              <ul className='ml-6 list-disc'>
                <li>view pages from our website in a web browser;</li>
                <li>print pages from our website for your own personal and non-commercial use providing that such printing is not systematic or excessive;</li>
                <li>stream audio and video files from our website using the media player on our website; and</li>
                <li>use our marketplace services by means of a web browser subject to the other provisions of these general terms and conditions.</li>
              </ul>
              </li>
              <li>You may only use our website for your personal and business purposes in respect of selling or purchasing products on the marketplace.</li>
              <li>Except as expressly permitted by these general terms and conditions you must not edit or otherwise modify any material on our website.</li>
              <li><span>Unless you own or control the relevant rights in the material you must not:</span>
              <ul className='ml-6 list-disc'>
                <li>republish material from our website (including republication on another website);</li>
                <li>sell rent or sub-license material from our website;</li>
                <li>show any material from our website in public;</li>
                <li>exploit material from our website for a commercial purpose; or</li>
                <li>redistribute material from our website.</li>
              </ul>
              </li>
              <li>Notwithstanding section 9.5 you may forward links to products on our website and redistribute our newsletter and promotional materials in print and electronic form to any person.</li>
              <li>We reserve the right to suspend or restrict access to our website to areas of our website and/or to functionality upon our website. We may for example suspend access to the website during server maintenance or when we update the website. You must not circumvent or bypass or attempt to circumvent or bypass any access restriction measures on the website.</li>
              <li><span>You must not:</span>
              <ul className='ml-6 list-disc'>
                <li>use our website in any way or take any action that causes or may cause damage to the website or impairment of the performance availability accessibility integrity or security of the website;</li>
                <li>use our website in any way that is unethical unlawful illegal fraudulent or harmful or in connection with any unlawful illegal fraudulent or harmful purpose or activity;</li>
                <li>hack or otherwise tamper with our website;</li>
                <li>probe scan or test the vulnerability of our website without our permission;</li>
                <li>circumvent any authentication or security systems or processes on or relating to our website;</li>
                <li>use our website to copy store host transmit send use publish or distribute any material which consists of (or is linked to) any spyware computer virus Trojan horse worm keystroke logger rootkit or other malicious computer software;</li>
                <li>impose an unreasonably large load on our website resources (including bandwidth storage capacity and processing capacity);</li>
                <li>decrypt or decipher any communications sent by or to our website without our permission;</li>
                <li>conduct any systematic or automated data collection activities (including without limitation scraping data mining data extraction and data harvesting) on or in relation to our website without our express written consent;</li>
                <li>access or otherwise interact with our website using any robot spider or other automated means except for the purpose of search engine indexing;</li>
                <li>use our website except by means of our public interfaces</li>
                <li>violate the directives set out in the robots.txt file for our website;</li>
                <li>use data collected from our website for any direct marketing activity (including without limitation email marketing SMS marketing telemarketing and direct mailing); or</li>
                <li>do anything that interferes with the normal use of our website.</li>
              </ul>
              </li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Intellectual Property Rights</p>
            <ul className='ml-6 list-disc'>
              <li><span>Subject to the express provisions of these general terms and conditions</span>
              <ul className='ml-6 list-disc'>
              <li>we together with our licensors own and control all the copyright and other intellectual property rights in our website and the material on our website; and</li>
              <li>all the copyright and other intellectual property rights in our website and the material on our website are reserved.</li>
            
              </ul>
              </li>
              <li>AfroMarketSquare’s logos and our other registered and unregistered trademarks are trademarks belonging to us; we give no permission for the use of these trademarks and such use may constitute an infringement of our rights.</li>
              <li>The third-party registered and unregistered trademarks or service marks on our website are the property of their respective owners and we do not endorse and are not affiliated with any of the holders of any such rights and as such we cannot grant any license to exercise such rights.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Data Privacy</p>
            <ul className='ml-6 list-disc'>
              <li>Buyers agree to the processing of their personal data in accordance with the terms of AfroMarketSquare’s Privacy and Cookie Notice.</li>
              <li>AfroMarketSquare shall process all personal data obtained through the marketplace and related services in accordance with the terms of our Privacy and Cookie Notice and Privacy Policy.</li>
              <li>Sellers shall be directly responsible to buyers for any misuse of their personal data and AfroMarketSquare shall bear no liability to buyers in respect of any misuse by sellers of their personal data.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Due diligence and audit rights</p>
            <ul className='ml-6 list-disc'>
              <li>We operate an anti-fraud and anti-money laundering compliance program and reserve the right to perform due diligence checks on all users of the marketplace.</li>
              <li><span>You agree to provide us with all such information documentation and access to your business premises as we may require:</span>
              <ul className='ml-6 list-disc'>
                <li>in order to verify your adherence to and performance of your obligations under these terms and conditions;</li>
                <li>for disclosures pursuant to a valid order by a court or other governmental body; or</li>
                <li>as otherwise required by law or applicable regulation.</li>
              </ul>
              </li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>AfroMarketSquare’s role as a marketplace</p>
            <ul className='ml-6 list-disc'>
              <li><span>You acknowledge that:</span>
              <ul className='ml-6 list-disc'>
                <li>AfroMarketSquare facilitates a marketplace for buyers and third-party sellers or AfroMarketSquare where AfroMarketSquare is the seller of a product;</li>
                <li>the seller at all times agree that they are the beneficial owners of the products they sell on the marketplace.</li>
                <li>the relevant seller of the product shall at all times remain exclusively liable for the products they sell on the marketplace; and</li>
                <li>in the event that there is an issue arising from the purchase of a product on the marketplace the buyer should seek recourse from the relevant seller of the product by following the process set out in the Complaint Policy</li>
                <li>as a vendor/seller on AfroMarketSquare, you are responsible for ensuring that your products are of good quality and condition. This means that they are not defective, damaged, expired, or otherwise unfit for consumption.</li>
                <li>if a customer requests a return or refund for your product due to quality issues, you must comply with our return and refund policy. You can find the details of this policy on our website.</li>
                <li>if we receive more than three return or refund requests for your product as a vendor within a short period of time, we may delist you from our platform. This is to protect our reputation and customer satisfaction.</li>
                <li>We will pay you for your products after the return and refund period has expired. This is to ensure that we have enough funds to process any potential refunds. We appreciate your understanding and cooperation.</li>
            
              </ul>
              </li>
              <li><span>We commit to ensure that AfroMarketSquare or third-party sellers as applicable submit information relating to their products on the marketplace that is completely accurate and up to date and pursuant thereto:</span>
              <ul className='ml-6 list-disc'>
                <li>the relevant seller warrants and represents the completeness and accuracy of the information published on our marketplace relating to their products;</li>
                <li>the relevant seller warrants and represents that the material on the marketplace is up to date; and</li>
                <li>if a buyer has a complaint relating to the accuracy or completeness of the product information received from a seller (including where AfroMarketSquare is the seller) the buyer can seek recourse from the relevant seller by following the process set out in the Complaint Policy</li>
            
              </ul>
              </li>
              <li>We do not warrant or represent that the marketplace will operate without fault; or that the marketplace or any service on the marketplace will remain available during the occurrence of events beyond AfroMarketSquare’s control (force majeure events) which include but are not limited to; flood drought earthquake or other natural disasters; hacking viruses malware or other malicious software attacks on the marketplace; terrorist attacks civil war civil commotion or riots; war threat of or preparation for war; epidemics or pandemics; or extra-constitutional events or circumstances which materially and adversely affect the political or macro-economic stability of the territory as a whole.</li>
              <li>We reserve the right to discontinue or alter any or all of our marketplace services and to stop publishing our marketplace at any time in our sole discretion without notice or explanation, and you will not be entitled to any compensation or other payment upon the discontinuance or alteration of any marketplace services or if we stop publishing the marketplace. This is without prejudice to your rights in respect of any unfulfilled orders or other existing liabilities of AfroMarketSquare.</li>
              <li>If we discontinue or alter any or all of our marketplace in circumstances not relating to force majeure we will provide prior notice to the buyers and sellers of not less than fifteen (15) days with clear guidance on the way forward for the pending transactions or other existing liabilities of AfroMarketSquare.</li>
              <li>We do not guarantee any commercial results concerning the use of the marketplace.</li>
              <li>To the maximum extent permitted by applicable law and subject to section 14.1 below we exclude all representations and warranties relating to the subject matter of these general terms and conditions of our marketplace and the use of our marketplace.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Limitations and Exclusions of Liability</p>
            <ul>
              <li><span>Nothing in these general terms and conditions will:</span>
              <ul className='ml-6 list-disc'>
                <li>limit any liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any liabilities or statutory rights that may not be excluded under applicable law.</li>
              </ul>
              </li>
              <li><span>The limitations and exclusions of liability set out in this clause and elsewhere in these general terms and conditions:</span>
              <ul className='ml-6 list-disc'>
                <li>are subject to section 14.1; and</li>
                <li>govern all liabilities arising under these general terms and conditions or relating to the subject matter of these general terms and conditions including liabilities arising in contract in tort (including negligence) and for breach of statutory duty except to the extent expressly provided otherwise in these general terms and conditions.</li>
              </ul>
              </li>
              <li>In respect of the services offered to you free of charge we will not be liable to you for any loss or damage of any nature whatsoever.</li>
              <li>Our aggregate liability to you in respect of any contract to provide services to you under these general terms and conditions shall not exceed the total amount paid and payable to us under the contract. Each separate transaction on the marketplace shall constitute a separate contract for the purpose of this clause.</li>
              <li><span>Notwithstanding the foregoing clauses we will not be liable to you for any loss or damage of any nature including in respect of:</span>
              <ul className='ml-6 list-disc'>
                <li>any losses occasioned by any interruption or dysfunction to the website;</li>
                <li>any losses arising out of any event or events beyond our reasonable control;</li>
                <li>any business losses including (without limitation) loss of or damage to profits income revenue use production anticipated savings business contracts commercial opportunities or goodwill;</li>
                <li>any loss or corruption of any data database or software; or</li>
                <li>any special indirect or consequential loss or damage.</li>
                <li>any latent defect in any goods sold on the Platform</li>
              </ul>
              </li>
              <li>We accept that we have an interest in limiting the personal liability of our officers and employees and having regard to that interest you acknowledge that we are a limited liability entity; you agree that you will not bring any claim personally against our officers or employees in respect of any losses you suffer in connection with the marketplace or these general terms and conditions (this will not limit or exclude the liability of the limited liability entity itself for the acts and omissions of our officers and employees).</li>
              <li>Our marketplace includes hyperlinks to other websites owned and operated by third parties; such hyperlinks are not recommendations. We have no control over third-party websites and their contents and we accept no responsibility for them or for any loss or damage that may arise from your use of them.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Indemnification</p>
            <ul className='ml-6 list-disc'>
              <li>
                <span>You hereby indemnify us and undertake to keep us indemnified against:</span>
                <ul className='ml-6 list-disc'>
                  <li>any and all losses damages costs liabilities and expenses (including without limitation legal expenses and any amounts paid by us to any third party in settlement of a claim or dispute) incurred or suffered by us and arising directly or indirectly out of your use of our marketplace or any breach by you of any provision of these general terms and conditions or the AfroMarketSquare codes policies or guidelines; and</li>
                  <li>any VAT liability or other tax liability that we may incur in relation to any sale supply or purchase made through our marketplace where that liability arises out of your failure to pay withhold declare or register to pay any VAT or other tax</li>
                </ul>
              </li>
            
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Breaches of these general terms and conditions</p>
            <ul className='ml-6 list-disc'>
              <li>If we permit the registration of an account on our marketplace it will remain open indefinitely subject to these general terms and conditions.</li>
              <li>
                <span>If you breach these general terms and conditions or if we reasonably suspect that you have breached these general terms and conditions or any AfroMarketSquare codes policies or guidelines in any way we may:</span>
                <ul className='ml-6 list-disc'>
                  <li>temporarily suspend your access to our marketplace;</li>
                  <li>permanently prohibit you from accessing our marketplace;</li>
                  <li>block computers using your IP address from accessing our marketplace;</li>
                  <li>contact any or all of your internet service providers and request that they block your access to our marketplace;</li>
                  <li>suspend or delete your account on our marketplace; and/or</li>
                  <li>commence legal action against you whether for breach of contract or otherwise.</li>
                </ul>
              </li>
              <li>Where we suspend prohibit or block your access to our marketplace or a part of our marketplace you must not take any action to circumvent such suspension prohibition or blocking (including without limitation creating and/or using a different account).</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Entire agreement</p>
            <ul className='ml-6 list-disc'>
              <li>These general terms and conditions and the AfroMarketSquare codes policies and guidelines (and in respect of sellers the seller terms and conditions) shall constitute the entire agreement between you and us in relation to your use of our marketplace and shall supersede all previous agreements between you and us in relation to your use of our marketplace.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Hierarchy</p>
            <ul className='ml-6 list-disc'><li>Should these general terms and conditions, and other policies and guidelines be in conflict these terms and conditions shall prevail.</li></ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Variation</p>
            <ul className='ml-6 list-disc'>
              <li>We may revise these general terms and conditions from time to time.</li>
              <li>The revised general terms and conditions shall apply from the date of publication on the marketplace.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>No waiver</p>
            <ul className='ml-6 list-disc'>
              <li>No waiver of any breach of any provision of these general terms and conditions shall be construed as a further or continuing waiver of any other breach of that provision or any breach of any other provision of these general terms and conditions.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Severability</p>
            <ul className='ml-6 list-disc'>
              <li>If a provision of these general terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable the other provisions will continue in effect.</li>
              <li>If any unlawful and/or unenforceable provision of these general terms and conditions would be lawful or enforceable if part of it were deleted that part will be deemed to be deleted and the rest of the provision will continue in effect.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Assignment</p>
            <ul className='ml-6 list-disc'>
              <li>You hereby agree that we may assign a transfer sub-contract or otherwise deal with our rights and/or obligations under these general terms and conditions.</li>
              <li>You may not without our prior written consent assign transfer sub-contract or otherwise deal with any of your rights and/or obligations under these general terms and conditions.</li>
            
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Third party rights</p>
            <ul className='ml-6 list-disc'>
              <li>A contract under these general terms and conditions is for our benefit and your benefit and is not intended to benefit or be enforceable by any third party.</li>
              <li>The exercise of the parties' rights under a contract under these general terms and conditions is not subject to the consent of any third party.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Law and jurisdiction</p>
            <ul className='ml-6 list-disc'>
              <li>These general terms and conditions shall be governed by and construed in accordance with the laws of the United Kingdom.</li>
              <li>Any disputes relating to these general terms and conditions shall be subject to negotiation. Upon failure to resolve the conflict within 30 days of submission to negotiation, the dispute shall be referred to the exclusive jurisdiction of the courts of the territory.</li>
            </ul>
          </div>

          <div className='my-2'>
            <p className='font-semibold'>Our company details and notices</p>
            <ul className='ml-6 list-disc'>
              <li>You can contact us at (Insert a link (Customer Care))</li>
              <li>You may contact our sellers for after-sales queries including any disputes by requesting their contact details from the AfroMarketSquare in accordance with the Complaint Policy pursuant to which AfroMarketSquare shall be obliged to ensure that the seller is clearly identifiable.</li>
              <li>You consent to receive notices electronically from us. We may provide all communications and information related to your use of the marketplace in electronic format either by posting to our website or application or by email to the email address on your account. All such communications will be deemed to be notices in writing and received by and properly given to you.</li>
            </ul>
                    </div>
          </div>

        <div className='mt-10 w-[80%] flex gap-5 justify-center mb-4'>
          <button className='w-full py-2 rounded-md bg-secondaryColor text-primaryColor'>Decline</button>
          <button className='w-full py-2 rounded-md bg-primaryColor text-white'>Accept</button>
        </div>
      </div>

    </div>
  )
}

export default PrivacyPolicy