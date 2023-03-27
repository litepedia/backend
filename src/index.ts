

import * as ff from '@google-cloud/functions-framework';
import { termWikiHandler } from "./routes";

ff.http('litePediaTerm', termWikiHandler);