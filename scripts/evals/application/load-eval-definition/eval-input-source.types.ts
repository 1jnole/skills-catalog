import { z } from 'zod';

import { evalInputSourceSchema } from './eval-input-source.schema.js';

export type EvalInputSource = z.infer<typeof evalInputSourceSchema>;
