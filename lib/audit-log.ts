import "server-only";

import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type AuditLogInput = {
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
  metadata?: Prisma.InputJsonValue;
};

export async function writeAuditLog(input: AuditLogInput) {
  await prisma.auditLog.create({
    data: {
      actor: "Maurice",
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      summary: input.summary,
      metadata: input.metadata,
    },
  });
}
