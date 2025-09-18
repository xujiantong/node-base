export interface CreateAudit {
  created_by: number;
  created_at: Date;
  is_deleted: number;
}
export interface UpdateAudit {
  updated_by: number;
  updated_at: Date;
  is_deleted: number;
}
export const genCreateAudit = function (this: any): CreateAudit {
  const now = new Date();
  const { id } = this?.request.user || {};
  return {
    created_by: id || null,
    created_at: now,
    is_deleted: 0
  };
};
export const genUpdateAudit = function (this: any): UpdateAudit {
  const now = new Date();
  const { id } = this?.request.user || {};
  return {
    updated_by: id || null,
    updated_at: now,
    is_deleted: 0
  };
};
