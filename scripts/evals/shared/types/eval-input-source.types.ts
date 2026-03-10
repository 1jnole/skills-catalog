import { z } from 'zod';

import { evalInputSourceSchema } from '../schemas/eval-input-source.schema.js';

export type EvalInputSource = z.infer<typeof evalInputSourceSchema>;
