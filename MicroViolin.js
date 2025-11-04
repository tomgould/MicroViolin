/**
 * MicroViolin.js v1.0.0
 * The world's smallest violin, now as a Service (SaaS)
 *
 * Enterprise-grade empathy delivery system for first-world problems.
 * ISO 9001 certified. GDPR compliant. Blockchain-ready.
 *
 * @license MIT
 * @author The Sympathy Team
 */

(function(window) {
    'use strict';

    // Configuration object (because we're PROFESSIONAL)
    const config = {
        audioEnabled: true,
        audioPath: 'Sad_Trombone.mp3',
        fadeInDuration: 500,
        violinSize: 'micro', // Options: nano, micro, mini, small (we only support micro)
        debug: false
    };

    // Our precious collection of violin memes
    const violinMemes = [
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KZSUN7FKBZrm2WHDdX/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13A7YlLvYVDnmU/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d0sWibpAwneSI/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sbCdjSJEGghGM/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CLbGZ9GQbaznhqjRkE/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gXhBZfzijya76/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WQxCOg6ezpfRkwAyA7/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2rANNgAlPZcFW/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/c2Sc2TMfKbX7W/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ApgJQ015dHoPxBgNYr/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10OKEWqz72UW7C/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fs2SSoIdEmsi4/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13Cys1xa3cZGRa/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SkhPpSCNFANLa/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oFk101f74JtGE/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ARW8yiJ2oiExXIZhXd/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9uITZ8f9Q12dYhQGGl/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/iJ8CxvHRj1uw1KWEF8/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dNzPAUWqVIaqs/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbzhxYWxyd2Z3Y2luMzh1dHpkdWw3bXE2MnphbDUzb2UwOWF3M2M4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LSk5aGh2WYL6g/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13A7YlLvYVDnmU/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KZSUN7FKBZrm2WHDdX/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d0sWibpAwneSI/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sbCdjSJEGghGM/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PV20uW90pfZSSr26eJ/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fs2SSoIdEmsi4/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/c2Sc2TMfKbX7W/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2rANNgAlPZcFW/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SkhPpSCNFANLa/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gXhBZfzijya76/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4MHv5aIo6SI2A/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ARW8yiJ2oiExXIZhXd/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jlqJieWthmFZSpsHhe/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CLbGZ9GQbaznhqjRkE/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IRQiiaLzbeKuWyuY6N/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LSk5aGh2WYL6g/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10hfegXGKVRVNm/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WQxCOg6ezpfRkwAyA7/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUOwGbj5wjgzmaRY0o/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdnk4OHRqamdpcGV5bmhrb2ozenEwZHZma25nYW56ODd5anJjMmkyMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26FmQl6iR51m9542c/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13A7YlLvYVDnmU/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d0sWibpAwneSI/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sbCdjSJEGghGM/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KZSUN7FKBZrm2WHDdX/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SkhPpSCNFANLa/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2rANNgAlPZcFW/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/c2Sc2TMfKbX7W/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10hfegXGKVRVNm/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ARW8yiJ2oiExXIZhXd/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CLbGZ9GQbaznhqjRkE/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2uUsqRPPYesi4/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Yk47pE89zdMaI/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gXhBZfzijya76/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fs2SSoIdEmsi4/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ApgJQ015dHoPxBgNYr/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/747QxjsVC4lHkTbP1d/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CkulhgggRftfi/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6CZhoXhtis1LM5Zkfl/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LSk5aGh2WYL6g/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3N3MmU3bjJoaXdmcDA4cml4NnU3Z2N5bTdrdnlzdXF5d2Q4dDdocyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WQxCOg6ezpfRkwAyA7/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jlqJieWthmFZSpsHhe/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sbCdjSJEGghGM/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/57litq5puloCk/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KbTNbjRki4W8sAORJ8/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d0sWibpAwneSI/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o84UfVLcV3hpRSuSQ/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tOhAD8TJqXnYQ/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XA9i7IZ96hE5O/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sIHj7Sm43H30s/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l2a8oapqbUhlanPK0m/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10h3idv6iEAzyo/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QTCVpQ2ABno08/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YqbxXKDjzvniySsxmR/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ICfBtjgl5gSXK/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NYKnGyoVh3vYA/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13A7YlLvYVDnmU/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/c2Sc2TMfKbX7W/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kV5RlJgIHIuC4/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6Ei2qReFhKkTtO92/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczazZ3NnV1aHFkdzgwdWZzZ2g2OHZsOGRlcDFtemM2NXZ3eWtpN2NieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LrsaNJZfUSRUWlY5uu/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LwhnvcW8OCAt7sGOGA/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CLbGZ9GQbaznhqjRkE/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eBPKx8Aa0lwOGb4k2J/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o85xBvTpbahi80sRW/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dflCzHzbzPEvkKfx6I/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WQxCOg6ezpfRkwAyA7/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PV20uW90pfZSSr26eJ/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SkhPpSCNFANLa/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4JEHyYKmDq9VdaZQAa/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XUaFTiLzoUO4WnuEtf/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sIHj7Sm43H30s/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ehVHGCPITWFhYsMrRG/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6CZhoXhtis1LM5Zkfl/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2rANNgAlPZcFW/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cu5iXgXqcsaOe6xiiV/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ljRC0iF5857128ik5V/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/suggmZEUbayYVvMqnA/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pzNFARYdOWjStrRptw/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5zkDXMbwJ7OiUT9vyn/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWtyOWY5bTd1eWN1eWF2bzdkaWkwMXhrZ2lxZWl4cWhjMnkzN2xtZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26Ff7orsXgmfiYN9K/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WQxCOg6ezpfRkwAyA7/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10OKEWqz72UW7C/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oFk101f74JtGE/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/62L0mFC1qqV7H6aTHF/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pCUKTpM9JTJrOGCQR7/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KZSUN7FKBZrm2WHDdX/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26FmQl6iR51m9542c/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4MHv5aIo6SI2A/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CLbGZ9GQbaznhqjRkE/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d0sWibpAwneSI/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/c2Sc2TMfKbX7W/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13A7YlLvYVDnmU/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jlqJieWthmFZSpsHhe/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sbCdjSJEGghGM/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/57litq5puloCk/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2rANNgAlPZcFW/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KbTNbjRki4W8sAORJ8/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tOhAD8TJqXnYQ/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XA9i7IZ96hE5O/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczNWZ4MDJqY2hoaGozYWQycjVpNG45dGljMGhlMHJ6d3dxbmlmYmxyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o84UfVLcV3hpRSuSQ/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jlqJieWthmFZSpsHhe/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sbCdjSJEGghGM/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/57litq5puloCk/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KbTNbjRki4W8sAORJ8/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d0sWibpAwneSI/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o84UfVLcV3hpRSuSQ/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tOhAD8TJqXnYQ/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XA9i7IZ96hE5O/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sIHj7Sm43H30s/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l2a8oapqbUhlanPK0m/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NYKnGyoVh3vYA/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YqbxXKDjzvniySsxmR/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10h3idv6iEAzyo/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QTCVpQ2ABno08/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ICfBtjgl5gSXK/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/c2Sc2TMfKbX7W/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6Ei2qReFhKkTtO92/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13A7YlLvYVDnmU/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kV5RlJgIHIuC4/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczbHA4bWZ2ZG04N3Q1dTAxcXMwMDZkczh2OHlqYW1wd2NoMDBhcGc1bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IhGwYlCgBOww0/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13A7YlLvYVDnmU/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LwhnvcW8OCAt7sGOGA/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d0sWibpAwneSI/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LSk5aGh2WYL6g/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SkhPpSCNFANLa/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fs2SSoIdEmsi4/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sbCdjSJEGghGM/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CLbGZ9GQbaznhqjRkE/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WQxCOg6ezpfRkwAyA7/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KZSUN7FKBZrm2WHDdX/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2rANNgAlPZcFW/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dflCzHzbzPEvkKfx6I/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gXhBZfzijya76/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ehVHGCPITWFhYsMrRG/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10hfegXGKVRVNm/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/c2Sc2TMfKbX7W/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/747QxjsVC4lHkTbP1d/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUOwGbj5wjgzmaRY0o/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6CZhoXhtis1LM5Zkfl/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczdmptcTM4am8ydGE1eWphZjh4YXUwdmRibHpnZjYwY3k5Z3pnNGU1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13Cys1xa3cZGRa/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ARW8yiJ2oiExXIZhXd/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/j25gsQvCYgomoVSjM4/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KZSUN7FKBZrm2WHDdX/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LSk5aGh2WYL6g/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fG3wbPKsNeWPT8cPVp/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ljRC0iF5857128ik5V/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/suggmZEUbayYVvMqnA/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/APdBTcVKQXO2VqAOvE/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/beWrNE2H7lA77rSP7q/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/P3mJMhY6yacbQ134Kf/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4HrMwdB3dBwH82CQgE/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/zuO0ZBkdrufs3SZjEW/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/98MaHVwJOmWMz4cz1K/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10hfegXGKVRVNm/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WWVYgSIna4Bs4/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VrcucT74UiM2k/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PR7J3rrNCrFE4/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2SWfigZfH9lkEsc5j6/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DP9CYPGFkXNNm/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczaTh0enV4NXA1aW51YnUzczN4bDAxNWIxNTBkNXc4NDZhb2xqMzczZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/FoTnoLAPbqhDa7lt97/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sbCdjSJEGghGM/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ARW8yiJ2oiExXIZhXd/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/glVlBZi7GWg6Bpcj5e/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d0sWibpAwneSI/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jlqJieWthmFZSpsHhe/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/57litq5puloCk/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KbTNbjRki4W8sAORJ8/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o84UfVLcV3hpRSuSQ/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tOhAD8TJqXnYQ/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XA9i7IZ96hE5O/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sIHj7Sm43H30s/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l2a8oapqbUhlanPK0m/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10h3idv6iEAzyo/giphy.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QTCVpQ2ABno08/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YqbxXKDjzvniySsxmR/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ICfBtjgl5gSXK/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NYKnGyoVh3vYA/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13A7YlLvYVDnmU/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0IsGB4DkkcP4GEo0/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTRkYWU5ZDczN3NvMXk3OWd3endla3RkOGI0bHdyZjhvOWZyajdzYW4wdXdjdjNuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2vGkpF4z3Um1zgtKse/giphy.gif',
    ];

    // Audio instance (singleton pattern because we're FANCY)
    let audioInstance = null;

    /**
     * Initializes the audio player
     * @private
     */
    function initAudio() {
        if (!audioInstance) {
            audioInstance = new Audio(config.audioPath);
            audioInstance.volume = 0.5; // We're not monsters
        }
    }

    /**
     * Plays the sad trombone sound
     * @private
     */
    function playSadTrombone() {
        if (!config.audioEnabled) return;

        try {
            initAudio();
            audioInstance.currentTime = 0;
            audioInstance.play().catch(err => {
                // Ironically, we can't play sad trombone for the sad trombone error
                if (config.debug) console.log('Failed to play sad trombone:', err);
            });
        } catch (err) {
            if (config.debug) console.log('Audio initialization failed:', err);
        }
    }

    /**
     * Gets a random violin meme from our extensive collection
     * @returns {string} URL of a violin meme
     * @private
     */
    function getRandomViolin() {
        const index = Math.floor(Math.random() * violinMemes.length);
        return violinMemes[index];
    }

    /**
     * Creates the violin display element
     * @param {string} imageUrl - URL of the violin image
     * @returns {HTMLElement} The violin container element
     * @private
     */
    function createViolinElement(imageUrl) {
        const container = document.createElement('div');
        container.className = 'micro-violin-container';
        container.style.cssText = `
            text-align: center;
            padding: 20px;
            opacity: 0;
            transition: opacity ${config.fadeInDuration}ms ease-in;
        `;

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'The world\'s smallest violin';
        img.style.cssText = `
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;

        const caption = document.createElement('p');
        caption.style.cssText = `
            margin-top: 15px;
            font-family: 'Comic Sans MS', cursive, sans-serif;
            font-size: 18px;
            color: #666;
            font-style: italic;
        `;
        caption.textContent = '🎻 Here\'s the world\'s smallest violin, playing just for you 🎻';

        container.appendChild(img);
        container.appendChild(caption);

        // Fade in effect (because UX matters)
        setTimeout(() => {
            container.style.opacity = '1';
        }, 10);

        return container;
    }

    /**
     * Displays a random violin in the specified container
     * @param {string} containerId - ID of the container element
     * @public
     */
    function show(containerId) {
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`MicroViolin: Container with ID "${containerId}" not found. How ironic.`);
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        // Get and display a random violin
        const violinUrl = getRandomViolin();
        const violinElement = createViolinElement(violinUrl);
        container.appendChild(violinElement);

        // Play the sad trombone
        playSadTrombone();
    }

    /**
     * Enables or disables the sad trombone audio
     * @param {boolean} enabled - Whether audio should be enabled
     * @public
     */
    function setAudioEnabled(enabled) {
        config.audioEnabled = !!enabled;
        if (config.debug) console.log(`MicroViolin: Audio ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Checks if audio is currently enabled
     * @returns {boolean} Audio enabled state
     * @public
     */
    function isAudioEnabled() {
        return config.audioEnabled;
    }

    /**
     * Adds a new violin meme to the collection
     * @param {string} url - URL of the violin meme
     * @public
     */
    function addViolin(url) {
        if (typeof url === 'string' && url.length > 0) {
            violinMemes.push(url);
            if (config.debug) console.log('MicroViolin: Added new violin to collection');
        }
    }

    /**
     * Gets the current number of violins in the collection
     * @returns {number} Number of violin memes
     * @public
     */
    function getViolinCount() {
        return violinMemes.length;
    }

    // Console monitoring system (ENTERPRISE FEATURE)
    function initConsoleMonitoring() {
        // Store original console methods
        const originalError = console.error;
        const originalWarn = console.warn;

        // Override console.error
        console.error = function(...args) {
            playSadTrombone();
            originalError.apply(console, args);
        };

        // Override console.warn
        console.warn = function(...args) {
            playSadTrombone();
            originalWarn.apply(console, args);
        };

        // Global error handler
        window.addEventListener('error', function(event) {
            playSadTrombone();
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', function(event) {
            playSadTrombone();
        });

        if (config.debug) console.log('MicroViolin: Console monitoring initialized');
    }

    // Initialize console monitoring on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConsoleMonitoring);
    } else {
        initConsoleMonitoring();
    }

    // Public API (SOLID principles and all that jazz)
    window.MicroViolin = {
        show: show,
        setAudioEnabled: setAudioEnabled,
        isAudioEnabled: isAudioEnabled,
        addViolin: addViolin,
        getViolinCount: getViolinCount,
        version: '1.0.0'
    };

    // AMD support (because why not)
    if (typeof define === 'function' && define.amd) {
        define('MicroViolin', [], function() {
            return window.MicroViolin;
        });
    }

    // CommonJS support (gotta cover all bases)
    if (typeof module === 'object' && module.exports) {
        module.exports = window.MicroViolin;
    }

})(typeof window !== 'undefined' ? window : this);

